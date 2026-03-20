import { createReducer } from '@reduxjs/toolkit';
import { SubscriptionReducerState } from '../dataTypes';
import { getSubscription, getPaymentMethods, getActiveSubscription } from '../actions/SubscriptionAction';
import { userLogout } from '../actions/authAction';

const initialState: SubscriptionReducerState = {
  plans: [],
  fetching: false,
  paymentMethods: [],
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
    .addCase(getPaymentMethods.pending, state => {
      // maintain fetching state if needed, or separate fetching
    })
    .addCase(getPaymentMethods.fulfilled, (state, action) => {
      const payload = action?.payload?.data;
      if (action?.payload?.status) {
        state.paymentMethods = payload;
      }
    })
    .addCase(getPaymentMethods.rejected, state => {
      // handle error
    })
    .addCase(userLogout, state => {
      state.fetching = false;
      state.plans = [];
      state.activeSubscription = null;
    })
    .addCase(getActiveSubscription.pending, state => {
      // state.fetching = true;
    })
    .addCase(getActiveSubscription.fulfilled, (state, action) => {
      const payload = action?.payload?.data;
      if (action?.payload?.status) {
        state.activeSubscription = payload;
      }
    })
    .addCase(getActiveSubscription.rejected, state => {
      // state.fetching = false;
    });
});
export default SubscriptionReducer;
