import {createApi, BaseQueryFn} from '@reduxjs/toolkit/query/react';
import {initializeWorkouts, getAllWorkouts} from '../sync/workoutSync';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

interface Workout {
  id: string;
  date: string;
  duration: number;
  status: boolean;
  exercises: Exercise[];
}

const asyncStorageBaseQuery: BaseQueryFn = async arg => {
  try {
    // Initialize workouts if needed and get all workouts from AsyncStorage
    await initializeWorkouts();
    const workouts = await getAllWorkouts();

    return {
      data: {data: workouts},
    };
  } catch (error) {
    return {
      error: {status: 500, data: error},
    };
  }
};

export const workoutsApi = createApi({
  reducerPath: 'workoutsApi',
  baseQuery: asyncStorageBaseQuery,
  endpoints: builder => ({
    getWorkouts: builder.query<Workout[], void>({
      query: () => '/workouts',
      transformResponse: (response: any) => {
        return response.data.map((workout: any) => ({
          id: workout.id,
          date: workout.date,
          duration: workout.duration,
          // Map the synced property to the status field
          status: workout.synced ? 'Synced' : 'Pending',
          // Ensure proper exercise format
          exercises: Array.isArray(workout.exercises)
            ? workout.exercises.map((exercise: any) => ({
                id:
                  exercise.id ||
                  `ex-${Math.random().toString(36).substr(2, 9)}`,
                name: exercise.name,
                sets: exercise.sets,
                reps: exercise.reps,
                weight: exercise.weight || 0,
                notes: exercise.notes || '',
              }))
            : [],
        }));
      },
    }),
  }),
});

export const {useGetWorkoutsQuery} = workoutsApi;
