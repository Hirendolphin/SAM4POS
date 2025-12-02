import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native';

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
