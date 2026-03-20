import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Routes } from '../../constants';
import { useCallback, useState } from 'react';
import { apiURLs, post } from '../../services/api';
import { userLogout } from '../../redux/actions/authAction';
import { getActiveSubscription } from '../../redux/actions/SubscriptionAction';

const SettingController = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { userDetails, activeSubscriptions }: any = useAppSelector(state => ({
    userDetails: state?.auth?.userLoginDetails ?? {},
    activeSubscriptions: state?.subscription?.activeSubscription || null,
  }));

  useFocusEffect(
    useCallback(() => {
      activeSubscription();
    }, [])
  );

  const activeSubscription = async () => {
    await dispatch(getActiveSubscription()).unwrap();
  }

  const handleLogout = async () => {
    try {
      const response = await post(apiURLs.logout);
      dispatch(userLogout());
    } catch (error) {
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
  const navigateToBarcodeSetting = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: Routes.barcodeSettingScreen,
      }),
    );
  };

  return {
    handleLogout,
    navigateToSubscription,
    navigateToTermsConditions,
    navigateToPrivacyPolicy,
    userDetails,
    navigateToBarcodeSetting,
    activeSubscriptions,
  };
};

export default SettingController;
