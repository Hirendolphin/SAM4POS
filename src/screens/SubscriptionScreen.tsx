import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { PrimaryButton } from '../components/PrimaryButton';

export default function SubscriptionScreen() {
  const navigation = useNavigation();
  const [couponCode, setCouponCode] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Plan Card */}
        <View style={styles.planCard}>
          {/* Most Popular Badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Most Popular</Text>
            </View>
          </View>

          {/* Plan Details */}
          <View style={styles.planHeader}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.planTitle}>Standard Plan</Text>
          </View>

          {/* Features List */}
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• All Basic features</Text>
            <Text style={styles.featureItem}>• Bluetooth Scanner support</Text>
            <Text style={styles.featureItem}>• Priority Sync (faster processing)</Text>
            <Text style={styles.featureItem}>• Coupons & Discounts</Text>
          </View>

          {/* Price */}
          <Text style={styles.price}>$15 / month</Text>
        </View>

        {/* Coupon Input Section */}
        <View style={styles.couponSection}>
          <Text style={styles.couponLabel}>Coupon Input:</Text>
          <View style={styles.couponInputContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Enter Coupon Code"
              placeholderTextColor="#B0B0B0"
              value={couponCode}
              onChangeText={setCouponCode}
            />
            <Pressable style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Subscribe Button */}
      <View style={styles.footer}>
        <PrimaryButton title="Subscribe Now" onPress={() => console.log('Subscribe')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkMark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 8,
    lineHeight: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F1F1F',
    textAlign: 'center',
  },
  couponSection: {
    marginBottom: 20,
  },
  couponLabel: {
    fontSize: 15,
    color: '#4A4A4A',
    marginBottom: 12,
    fontWeight: '500',
  },
  couponInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F1F1F',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginRight: 12,
  },
  applyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});


