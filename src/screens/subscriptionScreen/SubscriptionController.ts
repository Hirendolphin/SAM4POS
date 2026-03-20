import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { PaymentMethod } from '../../redux/dataTypes';
import {
  getSubscription,
  getPaymentMethods,
  postCouponValidate,
} from '../../redux/actions/SubscriptionAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  handleAppStateFlags,
  showNotificationMessage,
} from '../utils/helperFunction';
import { apiURLs, post } from '../../services/api';
import axios from 'axios';
import { userForceLogout } from '../../redux/actions/authAction';
import { Routes } from '../../constants';

const SubscriptionController = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [couponCode, setCouponCode] = useState('');
  const { subscriptions, paymentMethods }: any = useAppSelector(state => ({
    subscriptions: state?.subscription?.plans || [],
    paymentMethods: state?.subscription?.paymentMethods || [],
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

  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

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
    dispatch(getPaymentMethods());
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
      const payload = response;
      console.log('response ==>>> ', payload);
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
          text: payload?.error || 'Invalid coupon code.',
        });
        setDiscount(null);
      }
    } catch (error: any) {
      setCouponMessage({
        type: 'error',
        text: error?.error || 'Something went wrong. Try again.',
      });
      setDiscount(null);
    } finally {
      setIsApplying(false);
    }
  };

  const handleSubscriptionPress = () => {
    if (!selectedPlanId) {
      showNotificationMessage('Please select a plan.');
      return;
    }
    setIsPaymentModalVisible(true);
  };

  const handleClosePaymentModal = () => {
    setSelectedPaymentMethod(null);
    setIsPaymentModalVisible(false);
  };

  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const processSubscription = async () => {
    if (!selectedPaymentMethod) {
      showNotificationMessage('Please select a payment method.');
      return;
    }
    setIsPaymentModalVisible(false);
    setTimeout(() => {
      setIsSubscribing(true);
    }, 500);

    try {
      const form = new FormData();
      form.append('subscription', selectedPlanId);
      if (discount) {
        form.append('coupon_code', couponCode);
      }
      form.append('payment_method', selectedPaymentMethod.provider_code);
      const response = await post(apiURLs.transaction, form);
      console.log('response ==>>> ', response?.data);
      const approvalUrl = response?.data?.data?.approval_url;
      if (approvalUrl) {
        // Linking.openURL(approvalUrl);
        setTimeout(() => {
          setIsSubscribing(false);
        }, 500);
        navigation.dispatch(
          CommonActions.navigate(Routes.payPalWebViewScreen, {
            approvalUrl: approvalUrl,
            transaction_id: response?.data?.data?.transaction_trn,
            paypal_order_id: response?.data?.data?.payment_id,
            payment_method: selectedPaymentMethod.provider_code,
            returnUrl: 'https://example.com/paypal/success',
            cancelUrl: 'https://example.com/paypal/cancel',
            backendBase: 'http://192.168.1.100:5000',
          }),
        );
      }
    } catch (error) {
      console.log("error.response ===> ", error.response);
      setTimeout(() => {
        setIsSubscribing(false);
      }, 500);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          dispatch(userForceLogout({ forcelogout: true }));
        } else if (error.response?.data?.status === false) {
          const eData = error?.response?.data;
          const handled = handleAppStateFlags(eData, dispatch);
          if (!handled && typeof error.response?.data?.error === 'string') {
            showNotificationMessage(error.response.data.error);
          }
        }
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  return {
    navigation,
    couponCode,
    setCouponCode,
    subscriptions,
    paymentMethods,
    selectedPlanId,
    setSelectedPlanId,
    handleSelectPlan,
    handleApplyCoupon,
    couponMessage,
    discount,

    // Payment Modal Props
    isPaymentModalVisible,
    handleSubscriptionPress,
    handleClosePaymentModal,
    selectedPaymentMethod,
    handleSelectPaymentMethod,
    processSubscription,
    isSubscribing,
  };
};

export default SubscriptionController;
