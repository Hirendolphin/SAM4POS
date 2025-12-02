import { createReducer } from '@reduxjs/toolkit';
import { SubscriptionReducerState } from '../dataTypes';
import { getSubscription } from '../actions/SubscriptionAction';
import { userLogout } from '../actions/authAction';

const initialState: SubscriptionReducerState = {
  plans: [],
  fetching: false,
};

const SubscriptionReducer = createReducer(initialState, builder => {
  builder
    .addCase(getSubscription.pending, state => {
      state.fetching = true;
    })
    .addCase(getSubscription.fulfilled, (state, action) => {
      const payload = action?.payload?.data;

      if (action?.payload.status) {
        state.plans = payload;
      }
      state.fetching = false;
    })
    .addCase(getSubscription.rejected, state => {
      state.fetching = false;
    })
    .addCase(userLogout, state => {
      state.fetching = false;
      state.plans = [];
    });
});
export default SubscriptionReducer;
