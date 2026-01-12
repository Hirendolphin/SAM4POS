import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  handleAppStateFlags,
  showNotificationMessage,
} from '../../screens/utils/helperFunction';
import { apiURLs, get } from '../../services/api';
import * as types from '../actionTypes';
import { RootState } from '../store';
import { userForceLogout } from './authAction';

export const getPLU = createAsyncThunk<
  any,
  { page: number; limit: number; isLoadMore?: boolean; search?: string },
  { state: RootState }
>(types.GET_PLU, async (requestData, { rejectWithValue, dispatch }) => {
  try {
    const searchParam = requestData.search
      ? encodeURIComponent(requestData.search)
      : '';

    const response = await get(
      `${apiURLs.pluList}?search=${searchParam}&page=${requestData.page}&page_size=${requestData.limit}`,
    );

    return {
      ...response.data,
      isLoadMore: requestData.isLoadMore || false,
      currentPage: requestData.page,
    };
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

export const getStatusGroup = createAsyncThunk<any, void, { state: RootState }>(
  types.GET_STATUS_GROUP,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await get(`${apiURLs.statusGroupList}`);
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
  },
);

export const getPriceLevel = createAsyncThunk<any, void, { state: RootState }>(
  types.GET_PRICE_LEVEL,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await get(`${apiURLs.priceLevel}`);
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
  },
);

export const setLastSync = createAction<string>(types.LAST_SYNC);
