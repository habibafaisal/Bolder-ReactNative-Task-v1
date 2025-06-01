// src/store/workoutsSlice.ts
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category, Exercise, UserStats, WorkoutSession} from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WorkoutsState = {
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

export const loadWorkoutsFromStorage = createAsyncThunk(
  'workouts/loadFromStorage',
  async (): Promise<WorkoutSession[]> => {
    const stored = await AsyncStorage.getItem('@workouts');
    if (stored) {
      return JSON.parse(stored);
    }
    console.log('No workouts found in storage');
    return [];
  },
);

export const completeWorkoutOffline = (workout: WorkoutSession) => ({
  type: 'workouts/addSession',
  payload: workout,
  meta: {
    offline: {
      // effect: actual API call
      effect: {
        url: 'https://your.api/endpoint',
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {'Content-Type': 'application/json'},
      },
      commit: {type: 'workouts/syncSuccess', meta: {id: workout.id}},
      rollback: {type: 'workouts/syncFailure', meta: {id: workout.id}},
    },
  },
});

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    addSession(state, action: PayloadAction<WorkoutSession>) {
      state.sessions.push({
        ...action.payload,
        synced: action.payload.synced ?? false,
      });
      state.stats.totalSessions += 1;
    },
    updateSession: (state, action) => {
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
    syncSuccess(state, action: PayloadAction<{id: string}>) {
      const session = state.sessions.find(s => s.id === action.payload.id);
      if (session) {
        session.synced = true;
      }
    },
    syncFailure(state, action: PayloadAction<{id: string}>) {
      const session = state.sessions.find(s => s.id === action.payload.id);
      if (session) {
        session.synced = false;
      }
      state.lastSyncFailed = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadWorkoutsFromStorage.pending, (state, action) => {
      console.log('Loading workouts from storage...');
    });
    builder.addCase(loadWorkoutsFromStorage.fulfilled, (state, action) => {
      console.log('Workouts loaded from storage:', action.payload);
      state.sessions = action.payload;
      state.stats.totalSessions = action.payload.length;
    });
  },
});

export const {addSession, updateSession, setSyncing, setSyncFailed} =
  workoutsSlice.actions;
export default workoutsSlice.reducer;
