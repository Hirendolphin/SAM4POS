import { createAction } from '@reduxjs/toolkit';
import * as types from '../actionTypes';
import { BarcodeSettingsStateType } from '../dataTypes';

export const setBarcodeSettings = createAction<BarcodeSettingsStateType>(
  types.SET_BARCODE_SETTINGS,
);

export const updateBarcodeSetting = createAction<{
  barcodeType: 'upc-a' | 'upc-e';
  key: 'transmitLeadingDigit' | 'transmitCheckDigit';
  value: boolean;
}>(types.UPDATE_BARCODE_SETTING);

export const resetBarcodeSettings = createAction(types.RESET_BARCODE_SETTINGS);
