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
      const exists = state.sessions.some(s => s.id === action.payload.id);
      console.log('exists', exists);
      if (!exists) {
        state.sessions.push({
          ...action.payload,
          synced: action.payload.synced ?? false,
        });
        state.stats.totalSessions += 1;
      }
    },
    updateSession: (state, action: PayloadAction<{ session: WorkoutSession }>) => {
      const index = state.sessions.findIndex(s => s.id === action.payload.session.id);
      if (index !== -1) {
        state.sessions[index] = {
          ...action.payload.session,
          synced: false,
          syncFailed: false,
          conflict: undefined,
        };
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
      if (session) {
        session.synced = true;
        session.syncFailed = false;
      }
      state.lastSyncFailed = false;
    },
    syncFailure(state, action: PayloadAction<{ id: string; conflict?: WorkoutSession }>) {
      const session = state.sessions.find(s => s.id === action.payload.id);
      if (session) {
        session.synced = false;
        session.syncFailed = true;
        if (action.payload.conflict) {
          session.conflict = { remote: action.payload.conflict };
        }
      }
      state.lastSyncFailed = true;
    }


  },

});

export const { addSession, updateSession, setSyncing, setSyncFailed, resetSession, syncSuccess, syncFailure } =
  workoutsSlice.actions;
export default workoutsSlice.reducer;
