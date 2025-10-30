import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { Input } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

function PlanCard() {
  return (
    <View style={styles.planCard}>
      <View style={styles.planHeaderRow}>
        <View style={styles.radio} />
        <Text style={styles.planTitle}>Standard Plan</Text>
        <View style={styles.pill}><Text style={styles.pillText}>Most Popular</Text></View>
      </View>
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• All Basic features</Text>
        <Text style={styles.bullet}>• Bluetooth Scanner support</Text>
        <Text style={styles.bullet}>• Priority Sync (faster processing)</Text>
        <Text style={styles.bullet}>• Coupons & Discounts</Text>
      </View>
      <Text style={styles.price}>$15 / month</Text>
    </View>
  );
}

export default function PaymentScreen() {
  const [coupon, setCoupon] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      <Text style={styles.subtitle}>Select a plan that fits your store's needs.</Text>

      <PlanCard />

      <View style={styles.couponRowWrap}>
        <Text style={styles.couponLabel}>Coupon Input:</Text>
        <View style={styles.couponRow}>
          <View style={{ flex: 1 }}>
            <Input placeholder="Enter Coupon Code" value={coupon} onChangeText={setCoupon} />
          </View>
          <View style={{ width: 12 }} />
          <PrimaryButton title="Apply" onPress={() => {}} style={styles.applyBtn} />
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <PrimaryButton title="Subscribe Now" onPress={() => navigation.navigate('Dashboard')} style={styles.subscribeBtn} />
      <Text style={styles.skip}>Skip for Now</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.mutedText,
    fontSize: 16,
    marginBottom: 18,
  },
  planCard: {
    borderRadius: 18,
    backgroundColor: colors.card,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  planHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  pill: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pillText: {
    color: '#fff',
    fontWeight: '600',
  },
  bullets: {
    marginTop: 12,
    gap: 6,
  },
  bullet: {
    color: colors.text,
    fontSize: 14,
  },
  price: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  couponRowWrap: {
    marginTop: 20,
  },
  couponLabel: {
    color: colors.text,
    marginBottom: 8,
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyBtn: {
    width: 120,
    height: 56,
  },
  subscribeBtn: {
    marginTop: 24,
  },
  skip: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});


