import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { RootStackParamList } from '../../navigation/AppNavigator';
import {
  getSubscription,
  postCouponValidate,
} from '../../redux/actions/SubscriptionAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { showNotificationMessage } from '../utils/helperFunction';

const SubscriptionController = () => {
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

  const [couponMessage, setCouponMessage] = useState(null);

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

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      showNotificationMessage('Please enter a coupon code.');
      return;
    }

    if (!selectedPlanId) {
      showNotificationMessage('Please select a plan before applying a coupon.');
      return;
    }

    try {
      const response = await dispatch(
        postCouponValidate({ coupon_code: couponCode.trim() }),
      );
      console.log('response postCouponValidate==>>  ', response);
    } catch (error: any) {
      console.log('error ===>>> ', error.response);
    } finally {
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
    handleApplyCoupon,
  };
};

export default SubscriptionController;
