import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Icons } from '../../assets/icons';
import CustomSwitch from '../../components/CustomSwitch';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Routes } from '../../constants';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import styles from './SettingsScreenStyle';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const [autoSync, setAutoSync] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const navigateToPrivacyPolicy = () => {
    navigation.navigate(Routes.privacyPolicy as never);
  };

  const navigateToTermsConditions = () => {
    navigation.navigate(Routes.termsConditions as never);
  };

  const navigateToSubscription = () => {
    navigation.navigate(Routes.subscription as never);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Dealer ID Card */}
        <View style={styles.dealerCard}>
          <Text style={styles.dealerLabel}>Dealer ID :</Text>
          <Text style={styles.dealerId}>125462117FD</Text>
        </View>

        {/* Subscription Plan Card */}
        <View style={styles.freeCard}>
          <View style={styles.row}>
            <View style={styles.rowFlex}>
              <Image source={Icons.premium} style={styles.iconSmall} />
              <Text style={styles.freeText}>Standard Plan</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.freeDesc}>
            Standard Plan – Active until 22 Oct 2025
          </Text>
          <PrimaryButton
            title="Manage Subscription"
            onPress={() => {}}
            style={styles.manageBtn}
          />
        </View>

        {/* Settings Menu */}
        <View style={styles.menuContainer}>
          {/* Privacy Policy */}
          <Pressable style={styles.menuItem} onPress={navigateToPrivacyPolicy}>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Image source={Icons.rightArrow} />
          </Pressable>

          {/* Terms & Conditions */}
          <Pressable
            style={styles.menuItem}
            onPress={navigateToTermsConditions}
          >
            <Text style={styles.menuText}>Terms & Conditions</Text>
            <Image source={Icons.rightArrow} />
          </Pressable>

          {/* Subscription */}
          <Pressable style={styles.menuItem} onPress={navigateToSubscription}>
            <Text style={styles.menuText}>Subscription</Text>
            <Image source={Icons.rightArrow} />
          </Pressable>

          {/* Auto Sync */}
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Auto Sync</Text>
            <CustomSwitch />
          </View>

          {/* Version */}
          <View style={[styles.menuItem, styles.menuItemLast]}>
            <Text style={styles.menuText}>Version</Text>
            <Text style={styles.versionText}>v1.0.0</Text>
          </View>
        </View>

        {/* Log Out Button */}

        <View style={{ height: 40 }} />
      </ScrollView>
      <PrimaryButton
        title="Log Out"
        style={styles.logoutBtn}
        onPress={() => {}}
        labelStyle={{ color: colors.red2 }}
      />
    </View>
  );
}
