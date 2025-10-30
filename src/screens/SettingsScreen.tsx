import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const [autoSync, setAutoSync] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    // Navigate back to login screen and reset the stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const navigateToPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy' as never);
  };

  const navigateToTermsConditions = () => {
    navigation.navigate('TermsConditions' as never);
  };

  const navigateToSubscription = () => {
    navigation.navigate('Subscription' as never);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.brand}>SAM4POS</Text>

      {/* Dealer ID Card */}
      <View style={styles.dealerCard}>
        <Text style={styles.dealerLabel}>Dealer ID :</Text>
        <Text style={styles.dealerId}>125462117FD</Text>
      </View>

      {/* Subscription Plan Card */}
      <View style={styles.planCard}>
        <View style={styles.planHeader}>
          <Text style={styles.crownIcon}>👑</Text>
          <Text style={styles.planBadge}>Standard Plan</Text>
        </View>
        <Text style={styles.planDetail}>Standard Plan – Active until 22 Oct 2025</Text>
        <Pressable style={styles.manageBtn} onPress={navigateToSubscription}>
          <Text style={styles.manageBtnText}>Manage Subscription</Text>
        </Pressable>
      </View>

      {/* Settings Menu */}
      <View style={styles.menuContainer}>
        {/* Privacy Policy */}
        <Pressable style={styles.menuItem} onPress={navigateToPrivacyPolicy}>
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Text style={styles.menuArrow}>›</Text>
        </Pressable>

        {/* Terms & Conditions */}
        <Pressable style={styles.menuItem} onPress={navigateToTermsConditions}>
          <Text style={styles.menuText}>Terms & Conditions</Text>
          <Text style={styles.menuArrow}>›</Text>
        </Pressable>

        {/* Subscription */}
        <Pressable style={styles.menuItem} onPress={navigateToSubscription}>
          <Text style={styles.menuText}>Subscription</Text>
          <Text style={styles.menuArrow}>›</Text>
        </Pressable>

        {/* Auto Sync */}
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Auto Sync</Text>
          <Switch
            value={autoSync}
            onValueChange={setAutoSync}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={autoSync ? colors.primary : '#F3F4F6'}
          />
        </View>

        {/* Version */}
        <View style={[styles.menuItem, styles.menuItemLast]}>
          <Text style={styles.menuText}>Version</Text>
          <Text style={styles.versionText}>v1.0.0</Text>
        </View>
      </View>

      {/* Log Out Button */}
      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
  },
  brand: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  dealerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dealerLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '400',
  },
  dealerId: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  planCard: {
    backgroundColor: '#FFF6DB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  crownIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  planBadge: {
    fontSize: 16,
    color: '#A57300',
    fontWeight: '700',
  },
  planDetail: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
  },
  manageBtn: {
    backgroundColor: colors.primary,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '400',
  },
  menuArrow: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  versionText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  logoutBtn: {
    backgroundColor: '#FEF2F2',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 16,
  },
});
