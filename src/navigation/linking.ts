import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<any> = {
    prefixes: ['boldertask://'],
    config: {
        screens: {
            WorkoutSession: {
                path: 'workout/session/:id',
            },
        },
    },
};
