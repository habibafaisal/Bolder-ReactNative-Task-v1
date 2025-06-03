export type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  WorkoutHistory: undefined;
  WorkoutPlanner: undefined;
  WorkoutSession: undefined;
  WorkoutDetail: {
    workoutId: string | number;
  };
  ExerciseDetails: {
    exerciseId: string;
  };
};

export type BottomTabParamList = {
  Workouts: undefined;
  WorkoutHistory: undefined;
  WorkoutPlanner: undefined;
};