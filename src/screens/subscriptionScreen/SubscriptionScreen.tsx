import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from '../../components/PrimaryButton';
import HeaderComponent from '../../components/HeaderComponent';
import InputTextComponent from '../../components/InputTextComponent';
import styles from './SubscriptionScreenStyle';
import { Routes } from '../../constants';
import { Icons } from '../../assets/icons';

function PlanCard() {
  return (
    <View style={styles.planCard}>
      <View style={styles.planHeaderRow}>
        <View style={styles.radio}>
          <Image
            source={Icons.correct}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.planTitle}>Standard Plan</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Most Popular</Text>
        </View>
      </View>
      <View style={styles.bullets}>
        <View style={styles.row}>
          <View style={styles.bulletsView} />
          <Text style={styles.bullet}>All Basic features</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.bulletsView} />
          <Text style={styles.bullet}>Bluetooth Scanner support</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.bulletsView} />
          <Text style={styles.bullet}>Priority Sync (faster processing)</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.bulletsView} />
          <Text style={styles.bullet}>Coupons & Discounts</Text>
        </View>
      </View>
      <Text style={styles.price}>$15 / month</Text>
    </View>
  );
}
export default function SubscriptionScreen() {
  const navigation = useNavigation();
  const [couponCode, setCouponCode] = useState('');

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Subscription"
        onPressBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PlanCard />

        <View style={styles.couponRowWrap}>
          <View style={styles.couponRow}>
            <InputTextComponent
              label="Coupon Input:"
              placeholdertext="Enter Coupon Code"
              mainStyle={{ flex: 1 }}
              inputProps={{ value: couponCode, onChangeText: setCouponCode }}
            />
            <PrimaryButton
              title="Apply"
              onPress={() => {}}
              style={styles.applyBtn}
            />
          </View>
        </View>
      </ScrollView>
      <PrimaryButton
        title="Subscribe Now"
        onPress={() => navigation.navigate(Routes.mainTabs)}
        style={styles.subscribeBtn}
      />
    </View>
  );
}
