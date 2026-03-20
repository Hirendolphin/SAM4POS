import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Routes } from '../../constants';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { userLogin } from '../../redux/actions/authAction';
import { showNotificationMessage } from '../utils/helperFunction';
import SplashScreen from 'react-native-splash-screen';

const LoginController = () => {
  const [dealerId, setDealerId] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [dealerError, setDealerError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [clientModalVisible, setClientModalVisible] = useState(false);
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
  }, []);

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

  useEffect(() => {
    if (userDetails?.is_new_customer) {
      setTimeout(() => {
        setClientModalVisible(true);
      }, 500);
    }
  }, [userDetails?.is_new_customer]);

  function onLogin() {
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
    dispatch(userLogin(data)).unwrap();
    // }
  }

  const onSubmitClientInfo = (ip: string, port: string) => {
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
      dispatch(userLogin(data)).unwrap();
    } catch (error) {
      setClientModalVisible(true);
      console.log('error ===>> ', error);
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
    onSubmitClientInfo
  };
};

export default LoginController;
