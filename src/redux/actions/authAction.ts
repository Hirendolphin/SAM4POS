import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURLs, APIVersion, AppVersion, get, post } from '../../services/api';
import * as types from '../actionTypes';
import { RootState } from '../store';
import { LoginResultType } from '../dataTypes';
import {
  handleAppStateFlags,
  showNotificationMessage,
} from '../../screens/utils/helperFunction';

type Loginarg = {
  dealer_id: string;
  password: string;
  client_ip?: string;
  client_port?: string;
};

export const userLogin = createAsyncThunk<
  LoginResultType,
  Loginarg,
  { state: RootState }
>(types.LOGIN, async (arg, { rejectWithValue, dispatch }) => {
  try {
    const form = new FormData();
    form.append('dealer_id', arg.dealer_id);
    form.append('password', arg?.password);
    console.log('arg ===>> ', arg);
    if (arg?.client_ip?.trim() && arg?.client_port?.trim()) {
      console.log('arg 1111===>> ', arg);
      form.append('client_ip', arg?.client_ip?.trim());
      form.append('client_port', arg?.client_port?.trim());
    }
    const response = await post(apiURLs.login, form);
    showNotificationMessage(response?.data?.message);
    console.log('response ==>>> ', response);
    return response?.data;
  } catch (error: any) {
    console.log('error ===>> ', error.response);
    if (arg?.client_ip?.trim() && arg?.client_port?.trim()) {
      dispatch(userLogout());
    }
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
      return rejectWithValue(error.response?.data ?? {});
    } else {
      return rejectWithValue({ message: error.message ?? '' });
    }
  }
});

export const getVersionDetails = createAsyncThunk<
  any,
  void,
  { state: RootState }
>(types.apiVersionCheck, async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await get(apiURLs.appVersionCheck, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        apiVersion: APIVersion,
        appVersion: AppVersion,
      },
    });
    return response?.data;
  } catch (error: any) {
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
      return rejectWithValue(error.response?.data ?? {});
    } else {
      return rejectWithValue({ message: error.message ?? '' });
    }
  }
});

export const userLogout = createAction(types.LOGOUT);
type forceLogout = {
  forcelogout: boolean;
};

export const userForceLogout = createAction<forceLogout>(types.FORCELOGOUT);

export const forceupdate = createAction<boolean>(types.forceUpdate);
export const maintenanceMode = createAction<boolean>(types.maintenanceMode);
