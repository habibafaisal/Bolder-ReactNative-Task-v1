import AsyncStorage from '@react-native-async-storage/async-storage';
import migrations from '../migrations/migration';
import { createMigrate, PersistConfig } from 'redux-persist';
import { RootState } from '../index';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  whitelist: ['workouts'],
  migrate: createMigrate(migrations, { debug: true }),
};
