import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';

import NetInfo from '@react-native-community/netinfo';

const detectNetwork = (callback: (arg0: boolean) => void) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    callback(!!state.isConnected);
  });

  return unsubscribe;
};

export const customOfflineConfig = {
  ...defaultConfig,
  effect: (
    effect: { url: string | URL | Request; options: RequestInit | undefined },
    action: any,
  ) => {
    console.log('Effect called here');
    return Promise.resolve(action.payload);
    // return fetch(effect.url, effect.options);
  },
  discard: (error: { response: { status: number } }, action: any, retries: any) => {
    const shouldDiscard =
      error &&
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    return shouldDiscard;
  },
  retry: (action: any, retries: number) => {
    console.log('Retry called here');
    if (retries < 5) {
      return 1000 * Math.pow(2, retries);
    }
  },
  detectNetwork,

};
