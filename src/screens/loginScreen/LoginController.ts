import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Routes } from '../../constants';
import { RootStackParamList } from '../../navigation/AppNavigator';

const LoginController = () => {
  const [dealerId, setDealerId] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [dealerError, setDealerError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function onLogin() {
    navigation.navigate(Routes.payment);
    // const isDealerNumeric = /^\d{8}$/.test(dealerId);
    // const isPasswordValid = password.length === 8;

    // setDealerError(isDealerNumeric ? null : 'Dealer ID must be 8 digits');
    // setPasswordError(
    //   isPasswordValid ? null : 'Password must be exactly 8 characters',
    // );

    // if (isDealerNumeric && isPasswordValid) {
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
  };
};

export default LoginController;
