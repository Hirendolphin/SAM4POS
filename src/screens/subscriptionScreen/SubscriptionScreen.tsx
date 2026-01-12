import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icons } from '../../assets/icons';
import HeaderComponent from '../../components/HeaderComponent';
import InputTextComponent from '../../components/InputTextComponent';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Routes } from '../../constants';
import styles from './SubscriptionScreenStyle';
import SubscriptionController from './SubscriptionController';
import { Plan } from '../../redux/dataTypes';
import { moderateScale } from '../../theme/Metrics';
import { colors } from '../../theme/colors';

function PlanCard({
  item,
  onSelect,
  isSelected,
}: {
  item: Plan;
  onSelect: () => void;
  isSelected: boolean;
}) {
  function convertToArray(text: string) {
    if (!text || typeof text !== 'string') return [];
    return text
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);
  }
  return (
    <TouchableOpacity
      style={[
        styles.planCard,
        {
          borderWidth: moderateScale(2),
          borderColor: isSelected ? colors.primary : colors.background,
        },
      ]}
      activeOpacity={0.8}
      onPress={onSelect}
    >
      <View style={styles.planHeaderRow}>
        <View
          style={[
            styles.radio,
            {
              backgroundColor: isSelected ? colors.primary : colors.background,
            },
          ]}
        >
          {isSelected && (
            <Image
              source={Icons.correct}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          )}
        </View>
        <Text style={styles.planTitle}>{item?.name}</Text>
        {/* <View style={styles.pill}>
            <Text style={styles.pillText}>Most Popular</Text>
          </View> */}
      </View>
      <View style={styles.bullets}>
        {convertToArray(item?.features).map(item => (
          <View style={styles.row} key={item}>
            <View style={styles.bulletsView} />
            <Text style={styles.bullet}>{item}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.price}>${item.amount} / month</Text>
    </TouchableOpacity>
  );
}
export default function SubscriptionScreen() {
  const {
    couponCode,
    navigation,
    setCouponCode,
    subscriptions,
    selectedPlanId,
    setSelectedPlanId,
    handleSelectPlan,
    handleApplyCoupon,
    couponMessage,
    discount,
    handleSubscription,
  } = SubscriptionController();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={styles.container}>
        <HeaderComponent
          title="Subscription"
          onPressBack={() => navigation.dispatch(CommonActions.goBack())}
        />

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={subscriptions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PlanCard
                item={item}
                isSelected={item.id === selectedPlanId}
                onSelect={() => handleSelectPlan(item.id)}
              />
            )}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 15 }}
          />
        </ScrollView>
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
              onPress={handleApplyCoupon}
              style={styles.applyBtn}
            />
          </View>
        </View>
        {couponMessage && (
          <Text
            style={{
              color:
                couponMessage.type === 'success' ? colors.verified : colors.red,
              marginTop: 6,
              fontSize: moderateScale(13),
              fontWeight: '500',
            }}
          >
            {couponMessage.text}
          </Text>
        )}
        {discount && (
          <View style={styles.discountBox}>
            <Text style={styles.discountText}>
              Discount applied: -${discount.amount}
            </Text>
            <Text style={styles.discountFinalPrice}>
              Final Price: ${discount.final_price}
            </Text>
          </View>
        )}
        <PrimaryButton
          title="Subscribe Now"
          onPress={() =>
            // navigation.dispatch(
            //   CommonActions.navigate({
            //     name: Routes.mainTabs,
            //   }),
            // )
            handleSubscription()
          }
          style={styles.subscribeBtn}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
