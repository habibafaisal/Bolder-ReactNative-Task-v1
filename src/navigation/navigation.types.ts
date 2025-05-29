export type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  WorkoutHistory: undefined;
  WorkoutPlanner: undefined;
  WorkoutSession: undefined;
  WorkoutDetails: {
    workoutId: string;
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