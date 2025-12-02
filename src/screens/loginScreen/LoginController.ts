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
    console.log('subscription_status ==>', status);

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
  };
};

export default LoginController;
