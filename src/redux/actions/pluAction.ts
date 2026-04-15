import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  handleAppStateFlags,
  showNotificationMessage,
  handleApiError,
} from '../../screens/utils/helperFunction';
import { apiURLs, get, post } from '../../services/api';
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
    console.log('response getPLU =>> ', response);

    return {
      ...response.data,
      isLoadMore: requestData.isLoadMore || false,
      currentPage: requestData.page,
    };
  } catch (error: any) {
    console.log('error getPLU =>> ', error?.response);
    handleApiError(error, dispatch as any);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data ?? {});
    } else {
      return rejectWithValue({ message: error.message ?? '' });
    }
  }
});

export const syncPLU = createAsyncThunk<
  any,
  {
    select_all?: boolean | number;
    exclude_ids?: number[];
    ids?: number[];
  },
  { state: RootState }
>(types.SYNC_PLU, async (requestData, { rejectWithValue, dispatch }) => {
  try {
    const payload = { ...requestData };

    const response = await post(`${apiURLs.pluSync}`, payload);
    console.log('response syncPLU =>> ', response);

    return response?.data;
  } catch (error: any) {
    console.log('error syncPLU =>> ', error?.response);
    handleApiError(error, dispatch as any);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data ?? {});
    } else {
      return rejectWithValue({ message: error.message ?? '' });
    }
  }
});

export const getPendingPLU = createAsyncThunk<
  any,
  { page: number; limit: number; isLoadMore?: boolean; search?: string },
  { state: RootState }
>(types.GET_PENDING_PLU, async (requestData, { rejectWithValue, dispatch }) => {
  try {
    const searchParam = requestData.search
      ? encodeURIComponent(requestData.search)
      : '';

    const response = await get(
      `${apiURLs.pendingPluList}?search=${searchParam}&page=${requestData.page}&page_size=${requestData.limit}`,
    );
    console.log('response getPendingPLU =>> ', response);

    return {
      ...response.data,
      isLoadMore: requestData.isLoadMore || false,
      currentPage: requestData.page,
    };
  } catch (error: any) {
    console.log('error getPendingPLU =>> ', error?.response);
    handleApiError(error, dispatch as any);
    if (axios.isAxiosError(error)) {
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
      console.log('response getStatusGroup =>> ', response);
      return response?.data;
    } catch (error: any) {
      console.log('error getStatusGroup =>> ', error?.response);
      handleApiError(error, dispatch as any);
      if (axios.isAxiosError(error)) {
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
      console.log('response getPriceLevel =>> ', response);
      return response?.data;
    } catch (error: any) {
      console.log('error getPriceLevel =>> ', error?.response);
      handleApiError(error, dispatch as any);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? {});
      } else {
        return rejectWithValue({ message: error.message ?? '' });
      }
    }
  },
);

export const getGroupList = createAsyncThunk<any, void, { state: RootState }>(
  types.GET_GROUP_LIST,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await get(`${apiURLs.groupList}`);
      console.log('response getGroupList =>> ', response);
      return response?.data;
    } catch (error: any) {
      console.log('error getGroupList =>> ', error?.response);
      handleApiError(error, dispatch as any);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? {});
      } else {
        return rejectWithValue({ message: error.message ?? '' });
      }
    }
  },
);

export const setLastSync = createAction<string>(types.LAST_SYNC);
export const clearPendingPlu = createAction(types.CLEAR_PENDING_PLU);

export const getPosDetails = createAsyncThunk<any, void, { state: RootState }>(
  types.GET_POS_DETAILS,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await get(`${apiURLs.posDetails}`);
      console.log('response getPosDetails =>> ', response);

      if (response?.status) {
        const now = new Date();

        const day = now.getDate().toString().padStart(2, '0');
        const month = now.toLocaleString('en-US', { month: 'short' });
        const year = now.getFullYear();

        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12;

        const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;

        dispatch(setLastSync(formattedDate));

        // Fetch remaining data in parallel
        await Promise.all([
          dispatch(getPLU({ page: 1, limit: 10 })).unwrap(),
          dispatch(getPriceLevel()).unwrap(),
          dispatch(getStatusGroup()).unwrap(),
          dispatch(getGroupList()).unwrap(),
        ]);
      }

      return response?.data;
    } catch (error: any) {
      console.log('error getPosDetails =>> ', error?.response);
      handleApiError(error, dispatch as any);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? {});
      } else {
        return rejectWithValue({ message: error.message ?? '' });
      }
    }
  },
);
