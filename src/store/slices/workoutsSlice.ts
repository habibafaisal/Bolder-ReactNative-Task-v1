// src/store/workoutsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Exercise, UserStats, WorkoutSession } from '../types/types';

export type WorkoutsState = {
  sessions: WorkoutSession[];
  exercises: Exercise[];
  categories: Category[];
  stats: UserStats;

  syncing: boolean;
  lastSyncFailed: boolean;
};

const initialState: WorkoutsState = {
  sessions: [],
  exercises: [],
  categories: [],
  stats: {
    totalSessions: 0,
    totalWeightLifted: 0,
    totalTimeSpent: 0,
  },
  syncing: false,
  lastSyncFailed: false,
};




const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    resetSession(state) {
      state.sessions = [];
      state.exercises = [];
      state.categories = [];
      state.stats = {
        totalSessions: 0,
        totalWeightLifted: 0,
        totalTimeSpent: 0,
      };
      state.syncing = false;
      state.lastSyncFailed = false;
    },
    addSession(state, action: PayloadAction<WorkoutSession>) {
      state.sessions.push({
        ...action.payload,
        synced: action.payload.synced ?? false,
      });
      state.stats.totalSessions += 1;
    },
    updateSession: (state, action: PayloadAction<WorkoutSession>) => {
      const index = state.sessions.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.sessions[index] = action.payload;
      }
    },
    setSyncing: (state, action: PayloadAction<boolean>) => {
      state.syncing = action.payload;
    },
    setSyncFailed: (state, action: PayloadAction<boolean>) => {
      state.lastSyncFailed = action.payload;
    },
    syncSuccess(state, action: PayloadAction<{ id: string }>) {
      const session = state.sessions.find(s => s.id === action.payload.id);
      console.log('session syncSuccess', session);
      if (session) {
        session.synced = true;
        session.syncFailed = false;
      }
      state.lastSyncFailed = false;
    },
    syncFailure(state, action: PayloadAction<{ id: string }>) {
      const session = state.sessions.find(s => s.id === action.payload.id);
      console.log('session syncFailure', session);

      if (session) {
        session.synced = false;
        session.syncFailed = true;
      }
      state.lastSyncFailed = true;
    },
  },

});

export const { addSession, updateSession, setSyncing, setSyncFailed, resetSession } =
  workoutsSlice.actions;
export default workoutsSlice.reducer;
