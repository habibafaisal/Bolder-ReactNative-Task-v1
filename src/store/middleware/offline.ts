import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';

import NetInfo from '@react-native-community/netinfo';
import customRetry from './customRetry';
import { WorkoutSession } from '../types/types';

let isOnline: boolean

const detectNetwork = (callback: (isConnected: boolean) => void) => {
  NetInfo.fetch().then(state => {
    isOnline = !!state.isConnected;
    callback(isOnline);
  });

  const unsubscribe = NetInfo.addEventListener(state => {
    isOnline = !!state.isConnected;
    callback(isOnline);
  });

  return unsubscribe;
};

export const customOfflineConfig = {
  ...defaultConfig,
  effect: async (effect: any, action: any) => {
    console.log('Effect called for:', action.type);

    if (action.type === 'workouts/addSession') {
      const localWorkout: WorkoutSession = action.payload;

      const isConflict = Math.random() < 0.5;
      console.log(isConflict, 'isConflict')

      if (isConflict) {
        const serverVersion: WorkoutSession = {
          ...localWorkout,
          id: localWorkout.id + '-server',
          synced: true,
        };
        console.log({ serverVersion })
        const error = {
          response: { status: 409 },
          serverVersion,
        };
        console.log('error', error)
        return Promise.reject(error);
      }

      return Promise.resolve(localWorkout);
    }

    if (defaultConfig.effect) {
      return defaultConfig.effect(effect, action);
    }

    return Promise.resolve();
  },
  discard: (error: { response: { status: any; }; }, action: any, retries: any) => {
    const status = error?.response?.status;

    const shouldDiscard =
      status &&
      status >= 400 &&
      status < 500 &&
      status !== 409 &&
      status !== 429;

    return shouldDiscard;
  },
  retry: (action: any, retries: number, error: any) => {
    return customRetry(action, retries, error, isOnline);
  },
  detectNetwork,
  rehydrate: true,
};
