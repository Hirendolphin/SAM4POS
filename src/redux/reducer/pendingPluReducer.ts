import { createReducer } from '@reduxjs/toolkit';
import { userLogout } from '../actions/authAction';
import {
  getPendingPLU,
} from '../actions/pluAction';
import { PendingPLUReducerState } from '../dataTypes';

const initialState: PendingPLUReducerState = {
  pendingPluList: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  currentPage: 1,
  limit: 10,
  loadingMore: false,
  fetching: false,
};

const pendingPluReducer = createReducer(initialState, builder => {
  builder
    .addCase(getPendingPLU.pending, (state, action) => {
      const isLoadMore = action.meta?.arg?.isLoadMore;

      if (isLoadMore) {
        state.loadingMore = true;
      } else {
        state.fetching = true;
      }
    })
    .addCase(getPendingPLU.fulfilled, (state, action) => {
      const payload = action.payload;

      if (payload.isLoadMore) {
        state.pendingPluList = {
          count: payload.count || state.pendingPluList.count,
          next: payload.next || null,
          previous: payload.previous || state.pendingPluList.previous,
          results: [
            ...state.pendingPluList.results,
            ...(payload.results?.results || []),
          ],
        };
        state.loadingMore = false;
      } else {
        state.pendingPluList = {
          count: payload.count || 0,
          next: payload.next || null,
          previous: payload.previous || null,
          results: payload.results?.results || [],
        };
        state.fetching = false;
      }

      state.currentPage = payload.currentPage || 1;
    })
    .addCase(getPendingPLU.rejected, (state, action) => {
      const isLoadMore = action.meta?.arg?.isLoadMore;

      if (isLoadMore) {
        state.loadingMore = false;
      } else {
        state.fetching = false;
      }
    })
    .addCase(userLogout, state => {
      state.fetching = false;
      state.pendingPluList = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
      state.currentPage = 1;
    });
});

export default pendingPluReducer;
