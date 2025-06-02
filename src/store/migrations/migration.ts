import { PersistedState } from 'redux-persist';
import { PersistedRootState } from '../types/types';

const migrations = {
    0: (state: any): PersistedRootState => {
        if (!state) {
            return {
                workouts: {
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
                },
                _persist: {
                    version: 0,
                    rehydrated: true,
                },
            };
        }

        return {
            ...state,
            workouts: {
                ...state.workouts,
                sessions: state.workouts?.sessions?.map(session => ({
                    ...session,
                    isArchived: session.isArchived ?? false,
                })) || [],
                exercises: state.workouts?.exercises || [],
                categories: state.workouts?.categories || [],
                stats: state.workouts?.stats || {
                    totalSessions: 0,
                    totalWeightLifted: 0,
                    totalTimeSpent: 0,
                },
            },
        };
    },
};

export default migrations;
