import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Icons } from '../../assets/icons';
import InputTextComponent from '../../components/InputTextComponent';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Routes } from '../../constants';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import styles from './PaymentScreenStyle';

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

export default function PaymentScreen() {
  const [coupon, setCoupon] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      <Text style={styles.subtitle}>
        Select a plan that fits your store's needs.
      </Text>

      <PlanCard />

      <View style={styles.couponRowWrap}>
        <View style={styles.couponRow}>
          <InputTextComponent
            label="Coupon Input:"
            placeholdertext="Enter Coupon Code"
            mainStyle={{ flex: 1 }}
            inputProps={{ value: coupon, onChangeText: setCoupon }}
          />
          <PrimaryButton
            title="Apply"
            onPress={() => {}}
            style={styles.applyBtn}
          />
        </View>
      </View>
      <View style={styles.marginBottom}>
        <PrimaryButton
          title="Subscribe Now"
          onPress={() => navigation.navigate(Routes.mainTabs)}
          style={styles.subscribeBtn}
        />
        <Text style={styles.skip}>Skip for Now</Text>
      </View>
    </View>
  );
}
