import { PersistState } from "redux-persist";
import { WorkoutsState } from "../slices/workoutsSlice";

export interface WorkoutSession {
  id: string;
  date: string;
  exercises: Exercise[];
  duration?: number;
  synced: boolean;
  syncFailed?: boolean;
  isArchived?: boolean;
  conflict?: {
    remote: WorkoutSession
  }
}

export interface PersistedRootState {
  workouts: WorkoutsState;
  _persist: PersistState;
}

export interface Exercise {
  id: string;
  name: string;
  categoryId: string;
  sets?: number;
  reps?: number;
  weight?: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface UserStats {
  totalSessions: number;
  totalWeightLifted: number;
  totalTimeSpent: number;
}
