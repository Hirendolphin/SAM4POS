import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Routes } from '../../constants';
import { useState } from 'react';
import { apiURLs, post } from '../../services/api';
import { userLogout } from '../../redux/actions/authAction';

const SettingController = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { userDetails }: any = useAppSelector(state => ({
    userDetails: state?.auth?.userLoginDetails ?? {},
  }));

  const [autoSync, setAutoSync] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await post(apiURLs.logout);
      dispatch(userLogout());
    } catch (error) {
      console.log(error);
      dispatch(userLogout());
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Routes.login }],
      }),
    );
  };

  const navigateToPrivacyPolicy = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: Routes.privacyPolicy,
      }),
    );
  };

  const navigateToTermsConditions = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: Routes.termsConditions,
      }),
    );
  };

  const navigateToSubscription = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: Routes.subscription,
      }),
    );
  };
  return {
    handleLogout,
    navigateToSubscription,
    navigateToTermsConditions,
    navigateToPrivacyPolicy,
    userDetails,
  };
};

export default SettingController;
