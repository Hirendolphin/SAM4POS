import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './authReducer';
import SubscriptionReducer from './SubscriptionReducer';
import pluReducer from './pluReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  subscription: SubscriptionReducer,
  plu: pluReducer,
});

export default rootReducer;
