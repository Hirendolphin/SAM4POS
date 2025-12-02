import { RootState } from '../store';
import * as types from '../actionTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiURLs, get, post } from '../../services/api';
import axios from 'axios';
import { PlanResponse } from '../dataTypes';
import { userForceLogout } from './authAction';
import { showNotificationMessage } from '../../screens/utils/helperFunction';

export const getSubscription = createAsyncThunk<
  PlanResponse,
  void,
  { state: RootState }
>(types.GET_SUBSCRIPTION, async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await get(apiURLs.subscrptions);
    return response?.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        dispatch(userForceLogout({ forcelogout: true }));
      } else if (error?.response?.status === 429) {
      } else if (typeof error?.response?.data?.error === 'string') {
        // showNotificationMessage(error?.response?.data?.error);
      } else if (error?.response?.status === 404) {
        // showNotificationMessage(error?.response?.data?.error || '');
      } else {
        // showNotificationMessage('An unknown error occurred');
      }
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
>(types.LOGIN, async (arg, { rejectWithValue, dispatch }) => {
  try {
    const form = new FormData();
    form.append('coupon_code', arg?.coupon_code);
    const response = await post(apiURLs.couponValidate, arg);
    showNotificationMessage(response?.data?.message);

    return response?.data;
  } catch (error: any) {
    console.log('error.response ==>> ', error.response);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch(userForceLogout({ forcelogout: true }));
      } else if (typeof error?.response?.data?.message === 'string') {
        showNotificationMessage(error?.response?.data?.message);
      } else if (error?.response?.status === 404) {
        // showNotificationMessage(error?.response?.data?.error || '');
      } else {
        // showNotificationMessage('An unknown error occurred');
      }
      return rejectWithValue(error?.response?.data ?? {});
    } else {
      return rejectWithValue({ message: error?.message ?? '' });
    }
  }
});
