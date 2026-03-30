import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './reducer';

const transformFetchings = createTransform(
  (inboundState: any, key) => {
    const { fetching, loadingMore, ...rest } = inboundState;
    return { ...rest, fetching: false, loadingMore: false, };
  },
  (outboundState) => outboundState
);

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth', 'subscription', 'plu', 'barcodeSetting'],
  transforms: [transformFetchings],
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer as any,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export { store, persistor };
