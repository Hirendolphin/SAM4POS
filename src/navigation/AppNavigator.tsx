import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import ForceLogoutComponent from '../components/ForceLogoutComponent';
import EditPLUScreen from '../screens/editPLUScreen/EditPLUScreen';
import { PLUItem } from '../redux/dataTypes';
import ForceUpdateModal from '../components/ForceUpdateModal';
import MaintenanceModal from '../components/MaintenanceModal';
import SoftUpdateModal from '../components/SoftUpdateModal';
import {
  forceupdate,
  getVersionDetails,
  maintenanceMode,
} from '../redux/actions/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkVersion, CheckVersionResponse } from 'react-native-check-version';
import PayPalWebViewScreen from '../screens/payPalWebViewScreen/PayPalWebViewScreen';
import BarcodeSettingScreen from '../screens/barcodeSettingScreen/BarcodeSettingScreen';

type EditPLU = Partial<{
  pluData: PLUItem;
}>;

type PaypalView = Partial<{
  approvalUrl: string;
  returnUrl?: string;
  cancelUrl?: string;
  backendBase?: string;
  transaction_id: string;
  paypal_order_id: string;
}>;

export type RootStackParamList = {
  [Routes.login]: undefined;
  [Routes.payment]: undefined;
  [Routes.mainTabs]: undefined;
  [Routes.subscription]: undefined;
  [Routes.privacyPolicy]: undefined;
  [Routes.termsConditions]: undefined;
  [Routes.editPLUScreen]: EditPLU;
  [Routes.payPalWebViewScreen]: PaypalView;
  [Routes.barcodeSettingScreen]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const insets = useSafeAreaInsets();
  const {
    loggedIn,
    forceLogout,
    userDetails,
    forceUpdate = false,
    maintenance = false,
  }: any = useAppSelector(state => ({
    loggedIn: state?.auth?.loggedIn ?? false,
    forceLogout: state?.auth?.forceLogout ?? false,
    userDetails: state?.auth?.userLoginDetails ?? {},
    forceUpdate: state?.auth?.forceUpdate || false,
    maintenance: state?.auth?.maintenanceMode || false,
  }));
  const dispatch = useAppDispatch();

  // // Local state
  const [versionInfo, setVersionInfo] = useState<CheckVersionResponse | null>(
    null,
  );
  const [isSoftUpdateModalVisible, setSoftUpdateModalVisible] = useState(false);
  const [isForceUpdateModalVisible, setForceUpdateModalVisible] =
    useState(false);
  const [isMaintenanceModalVisible, setMaintenanceModalVisible] =
    useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response: any = await dispatch(getVersionDetails());
        const apiStatus = response?.payload?.status;
        const apiBody = response?.payload?.data;

        if (apiStatus) {
          const versionConfig = apiBody;

          const version = await checkVersion({ country: 'in' });
          setVersionInfo(version);

          const isForceUpdateEnabled = versionConfig?.forceUpdate === true;
          const isMaintenanceEnabled = versionConfig?.maintenanceMode === true;
          const isUpdateNeeded = version?.needsUpdate === true;

          if (isForceUpdateEnabled && isUpdateNeeded) {
            await AsyncStorage.setItem('isResetState', 'true');
            setForceUpdateModalVisible(true);
            setSoftUpdateModalVisible(false);
            setMaintenanceModalVisible(false);
          } else if (!isForceUpdateEnabled && isUpdateNeeded) {
            // Soft update
            setSoftUpdateModalVisible(true);
            setForceUpdateModalVisible(false);
            setMaintenanceModalVisible(false);
          } else if (isMaintenanceEnabled) {
            // Maintenance mode
            setMaintenanceModalVisible(true);
            setSoftUpdateModalVisible(false);
            setForceUpdateModalVisible(false);
          } else {
            // All good – clear everything
            setSoftUpdateModalVisible(false);
            setForceUpdateModalVisible(false);
            setMaintenanceModalVisible(false);

            dispatch(forceupdate(false));
            dispatch(maintenanceMode(false));
          }
        }
      } catch (err) {
        return;
      }
    })();
  }, [forceUpdate, maintenance]);

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
          <Stack.Screen
            name={Routes.barcodeSettingScreen}
            component={BarcodeSettingScreen}
          />
          <Stack.Screen
            name={Routes.payPalWebViewScreen}
            component={PayPalWebViewScreen}
          />
        </Stack.Navigator>
        {forceLogout?.forcelogout && (
          <ForceLogoutComponent visible={forceLogout?.forcelogout || false} />
        )}
        {isForceUpdateModalVisible && (
          <ForceUpdateModal visible={isForceUpdateModalVisible} />
        )}
        {isMaintenanceModalVisible && (
          <MaintenanceModal visible={isMaintenanceModalVisible} />
        )}
        {isSoftUpdateModalVisible && (
          <SoftUpdateModal visible={isSoftUpdateModalVisible} />
        )}
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
