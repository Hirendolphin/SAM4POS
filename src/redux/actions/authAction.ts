import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURLs, post } from '../../services/api';
import * as types from '../actionTypes';
import { RootState } from '../store';
import { LoginResultType } from '../dataTypes';
import { showNotificationMessage } from '../../screens/utils/helperFunction';

type Loginarg = {
  dealer_id: string;
  password: string;
};

export const userLogin = createAsyncThunk<
  LoginResultType,
  Loginarg,
  { state: RootState }
>(types.LOGIN, async (arg, { rejectWithValue }) => {
  try {
    const form = new FormData();
    form.append('dealer_id', arg.dealer_id);
    form.append('password', arg?.password);
    const response = await post(apiURLs.login, form);
    showNotificationMessage(response?.data?.message);
    return response?.data;
  } catch (error: any) {
    console.log('error.response ==>> ', error?.response);

    if (axios.isAxiosError(error)) {
      if (typeof error?.response?.data?.message === 'string') {
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

export const userLogout = createAction(types.LOGOUT);
type forceLogout = {
  forcelogout: boolean;
};

export const userForceLogout = createAction<forceLogout>(types.FORCELOGOUT);
