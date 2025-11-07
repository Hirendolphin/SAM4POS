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

export type RootStackParamList = {
  [Routes.login]: undefined;
  [Routes.payment]: undefined;
  [Routes.mainTabs]: undefined;
  [Routes.subscription]: undefined;
  [Routes.privacyPolicy]: undefined;
  [Routes.termsConditions]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.topContainer}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Stack.Navigator
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
        </Stack.Navigator>
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
