import {configureStore, Tuple} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import offline from '@redux-offline/redux-offline/lib/config';
// @ts-ignore
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import persistConfig from './middleware/persistence';
import rootReducer from './rootReducer';
const offlineEnhancer = offline(offlineConfig);

// Wrap your reducer with persist + offline reducer
const enhancedReducer = offlineEnhancer.enhanceReducer(
  persistReducer(persistConfig, rootReducer),
);

// Configure store properly
export const store = configureStore({
  reducer: enhancedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      offlineEnhancer.middleware,
    ),
  enhancers: getDefaultEnhancers =>
    new Tuple(...offlineEnhancer.enhanceStore(getDefaultEnhancers())),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
