import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface WorkoutSession {
  id: string;
  date: string;
  exercises: string[];
}

interface WorkoutsState {
  sessions: WorkoutSession[];
  exercises: string[];
  categories: string[];
  stats: any;
}

const initialState: WorkoutsState = {
  sessions: [],
  exercises: [],
  categories: [],
  stats: {},
};

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    addSession(state, action: PayloadAction<WorkoutSession>) {
      state.sessions.push(action.payload);
    },
  },
});

export const {addSession} = workoutsSlice.actions;
export default workoutsSlice.reducer;
