import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import PaymentScreen from '../screens/paymentScreen/PaymentScreen';
import SubscriptionScreen from '../screens/subscriptionScreen/SubscriptionScreen';
import PrivacyPolicyScreen from '../screens/privacyPolicyScreen/PrivacyPolicyScreen';
import TermsConditionsScreen from '../screens/termsConditionsScreen/TermsConditionsScreen';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Routes } from '../constants';
import MainTabs from './MainTabs';
import { useAppSelector } from '../redux/hooks';
import ForceLogoutComponent from '../components/ForceLogoutComponent';
import EditPLUScreen from '../screens/editPLUScreen/EditPLUScreen';
import { PLUItem } from '../redux/dataTypes';
import ForceUpdateModal from '../components/ForceUpdateModal';
import MaintenanceModal from '../components/MaintenanceModal';
import SoftUpdateModal from '../components/SoftUpdateModal';

type EditPLU = Partial<{
  pluData: PLUItem;
}>;

export type RootStackParamList = {
  [Routes.login]: undefined;
  [Routes.payment]: undefined;
  [Routes.mainTabs]: undefined;
  [Routes.subscription]: undefined;
  [Routes.privacyPolicy]: undefined;
  [Routes.termsConditions]: undefined;
  [Routes.editPLUScreen]: EditPLU;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const insets = useSafeAreaInsets();
  const { loggedIn, forceLogout, userDetails }: any = useAppSelector(state => ({
    loggedIn: state?.auth?.loggedIn ?? false,
    forceLogout: state?.auth?.forceLogout ?? false,
    userDetails: state?.auth?.userLoginDetails ?? {},
  }));

  return (
    <View style={styles.topContainer}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Stack.Navigator
          initialRouteName={
            loggedIn
              ? userDetails?.data?.subscription_status === 'active'
                ? Routes.mainTabs
                : Routes.mainTabs
              : Routes.login
          }
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen name={Routes.login} component={LoginScreen} />
          <Stack.Screen name={Routes.payment} component={PaymentScreen} />
          <Stack.Screen name={Routes.mainTabs} component={MainTabs} />
          <Stack.Screen
            name={Routes.subscription}
            component={SubscriptionScreen}
          />
          <Stack.Screen
            name={Routes.privacyPolicy}
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen
            name={Routes.termsConditions}
            component={TermsConditionsScreen}
          />
          <Stack.Screen name={Routes.editPLUScreen} component={EditPLUScreen} />
        </Stack.Navigator>
        {forceLogout?.forcelogout && (
          <ForceLogoutComponent visible={forceLogout?.forcelogout || false} />
        )}
        {/* <ForceUpdateModal visible={true} /> */}
        {/* <MaintenanceModal visible={true} /> */}
        {/* <SoftUpdateModal visible={true} /> */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
