import { RootState } from '../store';
import * as types from '../actionTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURLs, get, post } from '../../services/api';
import axios from 'axios';
import { PlanResponse } from '../dataTypes';
import { userForceLogout } from './authAction';
import {
  handleAppStateFlags,
  showNotificationMessage,
  handleApiError,
} from '../../screens/utils/helperFunction';

export const getSubscription = createAsyncThunk<
  PlanResponse,
  void,
  { state: RootState }
>(types.GET_SUBSCRIPTION, async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await get(apiURLs.subscrptions);
    return response?.data;
  } catch (error: any) {
    handleApiError(error, dispatch as any);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data ?? {});
    } else {
      return rejectWithValue({ message: error?.message ?? '' });
    }
  }
});

type couponarg = {
  coupon_code: string;
};

export const postCouponValidate = createAsyncThunk<
  any,
  couponarg,
  { state: RootState }
>(types.VALIDATE_COUPON, async (arg, { rejectWithValue, dispatch }) => {
  try {
    const form = new FormData();
    form.append('coupon_code', arg?.coupon_code);
    const response = await post(apiURLs.couponValidate, arg);
    console.log('response?.data ==>> ', response?.data);
    // showNotificationMessage(response?.data?.message);
    return response?.data;
  } catch (error: any) {
    console.log('error.response ==>> ', error.response);
    handleApiError(error, dispatch as any);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data ?? {});
    } else {
      return rejectWithValue({ message: error?.message ?? '' });
    }
  }
});

export const getPaymentMethods = createAsyncThunk<
  any,
  void,
  { state: RootState }
>(types.GET_PAYMENT_METHODS, async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await get(apiURLs.paymentMethods);
    console.log('response?.data ==>> ', response?.data);
    return response?.data;
  } catch (error: any) {
    handleApiError(error, dispatch as any);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data ?? {});
    } else {
      return rejectWithValue({ message: error?.message ?? '' });
    }
  }
});

export const getActiveSubscription = createAsyncThunk<
  any,
  void,
  { state: RootState }
>(types.GET_ACTIVE_SUBSCRIPTION, async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await get(apiURLs.activeSubscription);
    console.log('response getActiveSubscription ==>> ', response?.data);
    return response?.data;
  } catch (error: any) {
    console.log('error getActiveSubscription ==>> ', error);
    handleApiError(error, dispatch as any);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data ?? {});
    } else {
      return rejectWithValue({ message: error?.message ?? '' });
    }
  }
});
