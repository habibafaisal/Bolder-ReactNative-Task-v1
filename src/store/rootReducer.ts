import {combineReducers} from 'redux';
import workoutsReducer from './slices/workouts';
import offlineReducer from './slices/offline';

const rootReducer = combineReducers({
  workouts: workoutsReducer,
  offline: offlineReducer,
});

export default rootReducer;
