import axios from 'axios';
import * as config from '../config/config';
import { RootState, store } from '../redux/store';
import DeviceInfo from 'react-native-device-info';
// import { BASE_URL } from "@env";

const APIVersion = 'v1';
const AppVersion = DeviceInfo.getVersion();

const apiInstance = axios.create({
  timeout: 60 * 2000,
  baseURL: config.BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: '*/*',
    'User-Agent': 'PostmanRuntime/7.50.0',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'X-API-Key': 'SAMPOS-API-12345',
    'X-App-Version': AppVersion,
    'X-API-Version': APIVersion,
  },
});

// const excludedUrls = ['auth/check-phone', 'auth/authenticate'];

apiInstance.interceptors.request.use(config => {
  const state: RootState = store.getState();
  const token = state.auth.userLoginDetails?.token;
  console.log('token =>> ', token);

  if (token) {
    config.headers.Authorization = `sam4pos ${token}`;
  }
  return config;
});

const get = (url = '', data = {}) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`/${url}`, { params: data })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteApi = (url = '') => {
  return new Promise((resolve, reject) => {
    apiInstance
      .delete(`/${url}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const post = (url = '', data = {}) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post(`/${url}`, data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const put = (url = '', data = {}) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .put(`/${url}`, data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

type ApiUrls = {
  login: string;
  logout: string;

  subscrptions: string;

  posDetails: string;
  priceLevel: string;

  groupList: string;
  statusGroupList: string;
  pluList: string;
  pendingPluList: string;
  couponValidate: string;
  pluScan: string;
  checkPLU: string;
  addPlu: string;
  updatePlu: string;
  deletePlu: string;
  appVersionCheck: string;
  transaction: string;
  capture: string;
  paymentMethods: string;
  activeSubscription: string;
};

const apiURLs: ApiUrls = {
  login: 'customers/login/',
  logout: 'customers/logout/',

  subscrptions: 'subscription/lists/',

  posDetails: 'plu/pos-details/',

  groupList: 'plu/group-table/',
  statusGroupList: 'plu/status-group-table/',
  priceLevel: 'plu/func-tend-category/',

  pluList: 'plu/lists/',
  pendingPluList: 'plu/sync-history/',
  couponValidate: 'coupon/validate/',
  pluScan: 'plu/scan/',
  checkPLU: 'plu/check-plu-code/',
  addPlu: 'plu/create/',
  updatePlu: 'plu/update/',
  deletePlu: 'plu/delete/',
  appVersionCheck: 'check-version/',
  transaction: 'transaction/',
  capture: 'transaction/capture/',
  paymentMethods: 'transaction/payment-methods/',
  activeSubscription: 'subscription/active/',
};

export {
  apiURLs,
  apiInstance,
  post,
  get,
  put,
  deleteApi,
  APIVersion,
  AppVersion,
};
