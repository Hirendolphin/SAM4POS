import { createReducer } from '@reduxjs/toolkit';
import { userLogout } from '../actions/authAction';
import { getPLU, getPriceLevel, getStatusGroup } from '../actions/pluAction';
import { PLUReducerState } from '../dataTypes';

const initialState: PLUReducerState = {
  pluList: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  currentPage: 1,
  limit: 10,
  loadingMore: false,
  fetching: false,
  statusGroup: [],
  priceLevel: [],
};

const pluReducer = createReducer(initialState, builder => {
  builder
    .addCase(getPLU.pending, (state, action) => {
      const isLoadMore = action.meta?.arg?.isLoadMore;

      if (isLoadMore) {
        state.loadingMore = true;
      } else {
        state.fetching = true;
      }
    })
    .addCase(getPLU.fulfilled, (state, action) => {
      const payload = action.payload;
      const { count, next, previous, results } = payload.results || {};

      if (payload.isLoadMore) {
        // Append new data for next page
        state.pluList = {
          count: payload.count || state.pluList.count,
          next: payload.next || null,
          previous: payload.previous || state.pluList.previous,
          results: [
            ...state.pluList.results,
            ...(payload.results?.results || []),
          ],
        };
        state.loadingMore = false;
      } else {
        // Fresh load (first page)
        state.pluList = {
          count: payload.count || 0,
          next: payload.next || null,
          previous: payload.previous || null,
          results: payload.results?.results || [],
        };
        state.fetching = false;
      }

      state.currentPage = payload.currentPage || 1;
    })
    .addCase(getPLU.rejected, (state, action) => {
      const isLoadMore = action.meta?.arg?.isLoadMore;

      if (isLoadMore) {
        state.loadingMore = false;
      } else {
        state.fetching = false;
      }
    })
    .addCase(getStatusGroup.pending, state => {
      state.fetching = true;
    })
    .addCase(getStatusGroup.fulfilled, (state, action) => {
      const payload = action?.payload?.data;

      if (action?.payload.status) {
        state.statusGroup = payload;
      }
      state.fetching = false;
    })
    .addCase(getStatusGroup.rejected, state => {
      state.fetching = false;
    })
    .addCase(getPriceLevel.pending, state => {
      state.fetching = true;
    })
    .addCase(getPriceLevel.fulfilled, (state, action) => {
      const payload = action?.payload?.data;

      if (action?.payload.status) {
        state.priceLevel = payload;
      }
      state.fetching = false;
    })
    .addCase(getPriceLevel.rejected, state => {
      state.fetching = false;
    })
    .addCase(userLogout, state => {
      state.fetching = false;
      state.pluList = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
      state.currentPage = 1;
      state.statusGroup = [];
      state.priceLevel = [];
    });
});

export default pluReducer;
