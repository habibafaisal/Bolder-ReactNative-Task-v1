import { createAsyncThunk } from "@reduxjs/toolkit";
import { WorkoutSession } from "../../store/types/types";
import { RootState } from "../../store";
const rollbackWithConflict = (action: any, error: any) => ({
    type: 'workouts/syncFailure',
    payload: {
        id: action.payload.id,
        conflict: error?.serverVersion,
    },
    meta: {
        handleConflict: true,
    },
});

export const createWorkoutSession = (session: WorkoutSession) => ({
    type: 'workouts/addSession',
    payload: session,
    meta: {
        offline: {
            effect: {
                type: 'SIMULATED_CREATE_WORKOUT',
                payload: session
            },
            commit: { type: 'workouts/syncSuccess', payload: { id: session.id } },
            rollback: rollbackWithConflict
        },
    },
});

export const forceSync = createAsyncThunk(
    'workouts/forceSync',
    async (_, { getState, dispatch }) => {
        console.log('asynccinngg');
        const state = getState() as RootState;
        const unsyncedSessions = state.workouts.sessions.filter(s => !s.synced);

        for (const session of unsyncedSessions) {
            dispatch({
                type: 'workouts/addSession',
                payload: session,
                meta: {
                    offline: {
                        effect: session,
                        commit: {
                            type: 'workouts/syncSuccess',
                            payload: { id: session.id },
                        },
                        rollback: rollbackWithConflict,

                    },
                },
            });
        }
    }
);
