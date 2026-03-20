import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { RootStackParamList } from '../../navigation/AppNavigator';
import {
  getSubscription,
  postCouponValidate,
} from '../../redux/actions/SubscriptionAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Routes } from '../../constants';
import { showNotificationMessage } from '../utils/helperFunction';

const PaymentController = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [couponCode, setCouponCode] = useState('');
  const { subscriptions }: any = useAppSelector(state => ({
    subscriptions: state?.subscription?.plans || [],
  }));
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    subscriptions[0]?.id || null,
  );
  const [couponMessage, setCouponMessage] = useState<{
    type: string;
    text: string;
  } | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [discount, setDiscount] = useState<{
    amount: number;
    type: string;
    finalPrice: number | string;
  } | null>(null);

  const handleSelectPlan = (id: string) => {
    setSelectedPlanId(id);
  };

  useFocusEffect(
    useCallback(() => {
      getSubscriptionPlanApi();
    }, []),
  );

  const getSubscriptionPlanApi = async () => {
    dispatch(getSubscription()).unwrap();
  };

  const handleSubscription = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Routes.mainTabs }],
      }),
    );
  };
  const handleSkipNow = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Routes.mainTabs }],
      }),
    );
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      showNotificationMessage('Please enter a coupon code.');
      return;
    }

    if (!selectedPlanId) {
      showNotificationMessage('Please select a plan before applying a coupon.');
      return;
    }
    setIsApplying(true);
    setCouponMessage(null);
    try {
      const response: any = await dispatch(
        postCouponValidate({
          coupon_code: couponCode.trim(),
        }),
      ).unwrap();
      const payload = response?.payload;
      console.log('response ==>>> ', response);
      if (payload?.status) {
        const discountValue = payload?.data?.discount ?? 0;
        const discountType = payload?.data?.type ?? 'fixed';

        // calculate final price if needed (example using subscription amount)
        const selectedPlan = subscriptions.find(
          (p: any) => p.id === selectedPlanId,
        );
        const planAmount = Number(selectedPlan?.amount ?? 0);

        let finalPrice = planAmount;
        if (discountType === 'percentage') {
          finalPrice = +(
            planAmount -
            (planAmount * discountValue) / 100
          ).toFixed(2);
        } else {
          finalPrice = +(planAmount - discountValue).toFixed(2);
        }

        setDiscount({ amount: discountValue, type: discountType, finalPrice });
        setCouponMessage({
          type: 'success',
          text: payload?.message || 'Coupon applied successfully!',
        });
      } else {
        // API returned status false
        setCouponMessage({
          type: 'error',
          text: payload?.message || 'Invalid coupon code.',
        });
        setDiscount(null);
      }
    } catch (error) {
      setCouponMessage({
        type: 'error',
        text: 'Something went wrong. Try again.',
      });
    } finally {
      setIsApplying(false);
    }
  };

  return {
    navigation,
    couponCode,
    setCouponCode,
    subscriptions,
    selectedPlanId,
    setSelectedPlanId,
    handleSelectPlan,
    handleSubscription,
    handleSkipNow,
    handleApplyCoupon,
    couponMessage,
    discount,
  };
};

export default PaymentController;
