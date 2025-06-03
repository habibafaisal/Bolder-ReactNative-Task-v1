import { LinkingOptions } from '@react-navigation/native';
import Workout from '../screens/WorkoutPlanner/Workout';

export const linking: LinkingOptions<any> = {
    prefixes: ['boldertask://', 'https://boldertask.com'],
    config: {
        screens: {
            Workout: {
                path: 'workout'
            },
            WorkoutDetail: {
                path: 'workout/:id',
            },
        },
    },
};
