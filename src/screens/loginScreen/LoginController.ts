import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Routes } from '../../constants';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { userLogin } from '../../redux/actions/authAction';
import { showNotificationMessage } from '../utils/helperFunction';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginController = () => {
  const [dealerId, setDealerId] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [dealerError, setDealerError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [savedCredentialsModalVisible, setSavedCredentialsModalVisible] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState<any[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const {
    loading = false,
    loggedIn = false,
    userDetails,
  }: any = useAppSelector(state => ({
    loading: state?.auth?.fetching || false,
    loggedIn: state?.auth?.loggedIn || false,
    userDetails: state?.auth?.userLoginDetails || {},
  }));

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const stored = await AsyncStorage.getItem('REMEMBER_ME_CREDENTIALS');
      if (stored) {
        const parsed = JSON.parse(stored);
        let credentialsArray: any[] = [];
        if (Array.isArray(parsed)) {
          credentialsArray = parsed;
        } else {
          credentialsArray = [parsed];
        }

        setSavedCredentials(credentialsArray);
        if (credentialsArray.length > 0) {
          setSavedCredentialsModalVisible(true);
        }
      }
    } catch (e) {
      console.log('Error loading credentials', e);
    }
  };

  const handleSaveCredentials = async (data: any) => {
    try {
      const stored = await AsyncStorage.getItem('REMEMBER_ME_CREDENTIALS');
      let credentialsArray: any[] = [];
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          credentialsArray = parsed;
        } else {
          credentialsArray = [parsed];
        }
      }

      if (remember) {
        const existingIndex = credentialsArray.findIndex((c: any) => c.client_ip === data.client_ip);
        if (existingIndex !== -1) {
          credentialsArray[existingIndex] = Object.assign({}, credentialsArray[existingIndex], data);
        } else {
          credentialsArray.push(data);
          if (credentialsArray.length > 2) {
            credentialsArray.shift(); // Keep only the latest 2 accounts
          }
        }
      } else {
        credentialsArray = credentialsArray.filter((c: any) => c.client_ip !== data.client_ip);
      }

      if (credentialsArray.length > 0) {
        await AsyncStorage.setItem('REMEMBER_ME_CREDENTIALS', JSON.stringify(credentialsArray));
        setSavedCredentials(credentialsArray);
      } else {
        await AsyncStorage.removeItem('REMEMBER_ME_CREDENTIALS');
        setSavedCredentials([]);
      }
    } catch (e) {
      console.log('Error saving credentials', e);
    }
  };

  const handleLoginWithSavedCreds = async (selectedCreds: any) => {
    setSavedCredentialsModalVisible(false);
    if (!selectedCreds) return;
    
    setDealerId(selectedCreds.dealer_id || '');
    setPassword(selectedCreds.password || '');
    setRemember(true);

    try {
      const response = await dispatch(userLogin(selectedCreds)).unwrap();
      if (response?.is_new_customer) {
        setTimeout(() => {
          setClientModalVisible(true);
        }, 500);
      } else {
        await handleSaveCredentials(selectedCreds);
      }
    } catch (error) {
      console.log('Login error ===>> ', error);
    }
  };

  useEffect(() => {
    if (!loggedIn) return;

    const status = userDetails?.data?.subscription_status;

    if (status === 'active') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Routes.mainTabs }],
        }),
      );
    } else if (status) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Routes.payment }],
        }),
      );
    }
  }, [loggedIn, userDetails?.data?.subscription_status, navigation]);

  // useEffect(() => {
  //   if (userDetails?.is_new_customer) {
  //     setTimeout(() => {
  //       setClientModalVisible(true);
  //     }, 500);
  //   }
  // }, [userDetails?.is_new_customer]);

  async function onLogin() {
    if (!dealerId?.trim()) {
      showNotificationMessage('Please enter your Dealer ID');
      return;
    }

    if (!password?.trim()) {
      showNotificationMessage('Please enter your password');
      return;
    }
    const data = {
      dealer_id: dealerId.trim(),
      password: password.trim(),
    };
    try {
      const response = await dispatch(userLogin(data)).unwrap();
      if (response?.is_new_customer) {
        setTimeout(() => {
          setClientModalVisible(true);
        }, 500);
      } else {
        await handleSaveCredentials(data);
      }
    } catch (error) {
      console.log('Login error ===>> ', error);
    }
  }

  const onSubmitClientInfo = async (ip: string, port: string) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const portNum = parseInt(port, 10);

    if (!ipRegex.test(ip.trim())) {
      showNotificationMessage('Please enter a valid Client IP address');
      return;
    }

    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      showNotificationMessage('Please enter a valid Client Port (1-65535)');
      return;
    }

    console.log('Valid Client Info:', ip, port);
    try {
      setClientModalVisible(false);
      const data = {
        dealer_id: dealerId.trim(),
        password: password.trim(),
        client_ip: ip.trim(),
        client_port: port.trim(),
      };
      const response = await dispatch(userLogin(data)).unwrap();
      if (response?.is_new_customer) {
        setTimeout(() => {
          setClientModalVisible(true);
        }, 500);
      } else {
        await handleSaveCredentials(data);
      }
    } catch (error) {
      console.log('error ===>> ', error);
      setClientModalVisible(true);
    }
  };

  return {
    dealerId,
    setDealerId,
    dealerError,
    setDealerError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    remember,
    setRemember,
    onLogin,
    loading,
    clientModalVisible,
    setClientModalVisible,
    onSubmitClientInfo,
    savedCredentialsModalVisible,
    setSavedCredentialsModalVisible,
    savedCredentials,
    handleLoginWithSavedCreds,
  };
};

export default LoginController;
