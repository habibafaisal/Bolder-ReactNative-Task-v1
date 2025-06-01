import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {offline} from '@redux-offline/redux-offline';
import rootReducer from './rootReducer';
import persistConfig from './middleware/persistence';
import {customOfflineConfig} from './middleware/offline';
import thunk from 'redux-thunk';

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: {
          ...customOfflineConfig,
          effect: async (
            effect: {url: string | URL | Request; options: RequestInit},
            action: any,
          ) => {
            const response = await customOfflineConfig.effect(effect, action);
            return response;
          },
        },
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: getDefaultEnhancers => [offline(customOfflineConfig)] as any,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
