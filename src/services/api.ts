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
        console.log('err get==>>' + url + err?.response);
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
        console.log('err delete==>>' + url + err?.response);
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
        console.log('errpost ==>>' + url + err?.response);
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
        console.log('err put==>>' + url + JSON.stringify(err?.response));
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
  couponValidate: string;
  pluScan: string;
  checkPLU: string;
  addPlu: string;
  updatePlu: string;
  deletePlu: string;
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
  couponValidate: 'coupon/validate/',
  pluScan: 'plu/scan/',
  checkPLU: 'plu/check-plu-code/',
  addPlu: 'plu/create/',
  updatePlu: 'plu/update/',
  deletePlu: 'plu/delete/',
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
