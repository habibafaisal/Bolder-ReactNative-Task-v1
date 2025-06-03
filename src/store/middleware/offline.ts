import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';

import NetInfo from '@react-native-community/netinfo';
import customRetry from './customRetry';
import { WorkoutSession } from '../types/types';

let isOnline: boolean

const detectNetwork = (callback: (arg0: boolean) => void) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    isOnline = !!state.isConnected;
    callback(!!state.isConnected);
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

      if (isConflict) {
        const serverVersion: WorkoutSession = {
          ...localWorkout,
          id: localWorkout.id + '-server',
          synced: true,
        };

        const error = {
          response: { status: 409 },
          serverVersion,
        };

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
      status !== 409 && // do not discard conflict errors
      status !== 429;

    return shouldDiscard;
  },
  retry: (action: any, retries: number, error: any) => {
    return customRetry(action, retries, error, isOnline);
  },
  detectNetwork,
};
