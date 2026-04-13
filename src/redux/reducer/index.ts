import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './authReducer';
import SubscriptionReducer from './SubscriptionReducer';
import pluReducer from './pluReducer';
import pendingPluReducer from './pendingPluReducer';
import barcodeSettingsReducer from './barcodeSettingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  subscription: SubscriptionReducer,
  plu: pluReducer,
  pendingPlu: pendingPluReducer,
  barcodeSetting: barcodeSettingsReducer,
});

export default rootReducer;
