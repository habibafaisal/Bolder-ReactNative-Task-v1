import {Exercise} from '../../store/types/types';

export type WorkoutTemplate = {
  id: string;
  name: string;
  description?: string;
  minutes?: number;
  calories?: number;
  exercises: Exercise[];
};

const baseTemplates: WorkoutTemplate[] = [
  {
    id: 'leg_day',
    name: 'Leg Day',
    description: 'Strength-focused lower body workout',
    exercises: [
      {
        id: 'squats',
        name: 'Barbell Squats',
        sets: 4,
        reps: 10,
        weight: 80,
        categoryId: 'legs',
      },
      {
        id: 'lunges',
        name: 'Walking Lunges',
        sets: 3,
        reps: 12,
        weight: 20,
        categoryId: 'legs',
      },
      {
        id: 'calf_raise',
        name: 'Calf Raises',
        sets: 4,
        reps: 15,
        weight: 25,
        categoryId: 'legs',
      },
    ],
  },
  {
    id: 'push_day',
    name: 'Push Day',
    description: 'Chest, shoulders and triceps workout',
    exercises: [
      {
        id: 'bench_press',
        name: 'Bench Press',
        sets: 4,
        reps: 8,
        weight: 60,
        categoryId: 'chest',
      },
      {
        id: 'shoulder_press',
        name: 'Shoulder Press',
        sets: 3,
        reps: 10,
        weight: 40,
        categoryId: 'shoulders',
      },
      {
        id: 'tricep_dips',
        name: 'Tricep Dips',
        sets: 3,
        reps: 12,
        weight: 0,
        categoryId: 'arms',
      },
    ],
  },
  {
    id: 'pull_day',
    name: 'Pull Day',
    description: 'Back and biceps workout',
    exercises: [
      {
        id: 'pull_ups',
        name: 'Pull-Ups',
        sets: 3,
        reps: 10,
        weight: 0,
        categoryId: 'back',
      },
      {
        id: 'barbell_row',
        name: 'Barbell Row',
        sets: 4,
        reps: 8,
        weight: 50,
        categoryId: 'back',
      },
      {
        id: 'bicep_curl',
        name: 'Bicep Curls',
        sets: 3,
        reps: 12,
        weight: 15,
        categoryId: 'arms',
      },
    ],
  },
  {
    id: 'core_workout',
    name: 'Core Blast',
    description: 'Ab and core strengthening workout',
    exercises: [
      {
        id: 'plank',
        name: 'Plank',
        sets: 3,
        reps: 1,
        weight: 0,
        categoryId: 'core',
      },
      {
        id: 'russian_twists',
        name: 'Russian Twists',
        sets: 3,
        reps: 20,
        weight: 10,
        categoryId: 'core',
      },
      {
        id: 'leg_raises',
        name: 'Leg Raises',
        sets: 3,
        reps: 15,
        weight: 0,
        categoryId: 'core',
      },
    ],
  },
];

const generateMockWorkouts = (count = 1000): WorkoutTemplate[] => {
  const templates: WorkoutTemplate[] = [];
  for (let i = 0; i < count; i++) {
    const base = baseTemplates[i % baseTemplates.length];
    templates.push({
      id: i.toString(),
      name: `${base.name} ${i + 1}`,
      description: base.description || '',
      exercises: [...base.exercises],
      minutes: Math.floor(Math.random() * 40) + 20,
      calories: Math.floor(Math.random() * 400) + 200,
    });
  }
  return templates;
};

export const workoutTemplates = generateMockWorkouts(1000);
