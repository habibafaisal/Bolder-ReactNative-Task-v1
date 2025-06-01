export interface WorkoutSession {
  id: string;
  date: string;
  exercises: Exercise[];
  synced: boolean;
  syncFailed?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  categoryId: string;
  sets?: number;
  reps?: number;
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
