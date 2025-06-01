import {combineReducers} from 'redux';
import workoutsReducer from './slices/workoutsSlice';

const rootReducer = combineReducers({
  workouts: workoutsReducer,
});

export default rootReducer;
