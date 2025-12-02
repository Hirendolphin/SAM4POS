import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets/icons';
import InputTextComponent from '../../components/InputTextComponent';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Plan } from '../../redux/dataTypes';
import { moderateScale } from '../../theme/Metrics';
import { colors } from '../../theme/colors';
import PaymentController from './PaymentController';
import styles from './PaymentScreenStyle';

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
    <View key={item.id.toString()}>
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
                backgroundColor: isSelected
                  ? colors.primary
                  : colors.background,
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
    </View>
  );
}

export default function PaymentScreen() {
  const {
    couponCode,
    navigation,
    setCouponCode,
    subscriptions,
    selectedPlanId,
    setSelectedPlanId,
    handleSelectPlan,
    handleSubscription,
    handleSkipNow,
    handleApplyCoupon,
  } = PaymentController();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      <Text style={styles.subtitle}>
        Select a plan that fits your store's needs.
      </Text>

      {/* <PlanCard /> */}

      <FlatList
        data={subscriptions}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlanCard
            item={item}
            isSelected={item.id === selectedPlanId}
            onSelect={() => handleSelectPlan(item.id)}
          />
        )}
        contentContainerStyle={{ gap: 15 }}
      />

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
      <View style={styles.marginBottom}>
        <PrimaryButton
          title="Subscribe Now"
          onPress={handleSubscription}
          style={styles.subscribeBtn}
        />
        <Text onPress={handleSkipNow} style={styles.skip}>
          Skip for Now
        </Text>
      </View>
    </View>
  );
}
