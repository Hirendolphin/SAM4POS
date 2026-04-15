import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native';
import { forceupdate, maintenanceMode } from '../../redux/actions/authAction';
import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { userForceLogout } from '../../redux/actions/authAction';

export const showNotificationMessage = (message: string) => {
  if (Platform.OS == 'android') {
    Toast.show(message, Toast.LONG);
  } else if (Platform.OS == 'ios') {
    setTimeout(() => {
      Toast.show(message, Toast.LONG);
    }, 500);
  }
};

export const formatDate = (date: Date | null) => {
  if (!date) return 'DD/MM/YYYY';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatSubscriptionDate = (dateString: string | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const getTimeStamp = () => {
  const date = new Date();

  const padTo2Digits = (num: any) => {
    return num.toString().padStart(2, '0');
  };

  const yyyy = date.getFullYear();
  const MM = padTo2Digits(date.getMonth() + 1);
  const dd = padTo2Digits(date.getDate());
  const HH = padTo2Digits(date.getHours());
  const mm = padTo2Digits(date.getMinutes());
  const ss = padTo2Digits(date.getSeconds());

  return `${yyyy}${MM}${dd}_${HH}${mm}${ss}`;
};

function normalizeBarcodeType(type: string) {
  if (type === 'upce') return 'upc-e';
  if (type === 'upca') return 'upc-a';
  return type;
}

export const processBarcode = (code: string, type: string, settings: any) => {
  let result = code;
  let normalizedType = normalizeBarcodeType(type);

  // EAN-13 starting with 0 → UPC-A
  if (normalizedType === 'ean-13' && code.startsWith('0')) {
    normalizedType = 'upc-a';
    result = code.substring(1);
  }

  const rules = settings[normalizedType];
  if (!rules) return result;

  if (rules.transmitLeadingDigit && result.length > 1) {
    result = result.substring(1);
  }

  if (rules.transmitCheckDigit && result.length > 1) {
    result = result.substring(0, result.length - 1);
  }

  return result;
};

export const handleAppStateFlags = (data: any, dispatch: Dispatch): boolean => {
  if (!data) return false;
  let triggered = false;

  if (data?.force_update === true || data?.data?.force_update === true) {
    dispatch(forceupdate(true));
    triggered = true;
  }

  if (
    data?.maintenance_mode === true ||
    data?.data?.maintenance_mode === true
  ) {
    dispatch(maintenanceMode(true));
    triggered = true;
  }

  return triggered;
};

export const handleApiError = (error: any, dispatch: Dispatch) => {
  if (axios.isAxiosError(error)) {
    console.log('error =>> ', error?.response);
    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatch(userForceLogout({ forcelogout: true } as any));
    } else if (error.response?.data?.status === false) {
      const eData = error?.response?.data;
      const handled = handleAppStateFlags(eData, dispatch);
      if (!handled && typeof error.response?.data?.error === 'string') {
        showNotificationMessage(error.response.data.error);
      }
    }
  }
};
