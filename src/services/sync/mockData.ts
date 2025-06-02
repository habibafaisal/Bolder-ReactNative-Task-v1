import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise, WorkoutSession } from '../../store/types/types';
import { addSession } from '../../store/slices/workoutsSlice';
import { AppDispatch } from '../../store';

const mockWorkouts: WorkoutSession[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    exercises: [
      {
        id: 'pushups',
        name: 'Push Ups',
        sets: 3,
        reps: 15,
        categoryId: 'bodyweight',
      },
      { id: 'squats', name: 'Squats', sets: 4, reps: 12, categoryId: 'legs' },
    ],
    synced: true,
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000).toISOString(),
    exercises: [
      {
        id: 'deadlift',
        name: 'Deadlift',
        sets: 5,
        reps: 5,
        categoryId: 'strength',
      },
      {
        id: 'benchpress',
        name: 'Bench Press',
        sets: 5,
        reps: 5,
        categoryId: 'strength',
      },
    ],
    synced: true,
  },
  {
    id: '3',
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    exercises: [
      {
        id: 'pullups',
        name: 'Pull Ups',
        sets: 3,
        reps: 10,
        categoryId: 'bodyweight',
      },
    ],
    synced: true,
  },
  {
    id: '4',
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    exercises: [
      {
        id: 'pullups',
        name: 'Pull Ups',
        sets: 3,
        reps: 10,
        categoryId: 'bodyweight',
      },
    ],
    synced: true,
  },
  {
    id: '5',
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    exercises: [
      {
        id: 'pullups',
        name: 'Pull Ups',
        sets: 3,
        reps: 10,
        categoryId: 'bodyweight',
      },
    ],
    synced: true,
  },
];
export const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    categoryId: 'strength',
    sets: 3,
    reps: 10,
    weight: 0,
  },
  {
    id: '2',
    name: 'Squats',
    categoryId: 'strength',
    sets: 3,
    reps: 12,
    weight: 0,
  },
];
export const seedMockWorkouts = async (dispatch: AppDispatch) => {
  try {
    mockWorkouts.forEach(workout => dispatch(addSession(workout)));
  } catch (err) {
    console.error('Error saving mock workouts:', err);
  }
};
