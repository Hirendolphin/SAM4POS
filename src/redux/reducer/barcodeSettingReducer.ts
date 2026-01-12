import { createReducer } from '@reduxjs/toolkit';

import { BarcodeSettingsStateType } from '../dataTypes';
import {
  resetBarcodeSettings,
  setBarcodeSettings,
  updateBarcodeSetting,
} from '../actions/barcodeSettingAction';

const initialState: BarcodeSettingsStateType = {
  'upc-a': {
    transmitLeadingDigit: false,
    transmitCheckDigit: false,
  },
  'upc-e': {
    transmitLeadingDigit: false,
    transmitCheckDigit: false,
  },
};

const barcodeSettingsReducer = createReducer(initialState, builder => {
  builder
    // Set all settings (API / persisted data)
    .addCase(setBarcodeSettings, (state, action) => {
      return action.payload;
    })

    // Update single toggle (UPC-A / UPC-E)
    .addCase(updateBarcodeSetting, (state, action) => {
      console.log('action.payload ==>> ', action.payload);
      const { barcodeType, key, value } = action.payload;
      state[barcodeType][key] = value;
    })

    // Reset on logout (optional but recommended for POS)
    .addCase(resetBarcodeSettings, () => {
      return initialState;
    });
});

export default barcodeSettingsReducer;
