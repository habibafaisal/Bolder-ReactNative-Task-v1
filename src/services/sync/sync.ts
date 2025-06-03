import { WorkoutSession } from "../../store/types/types";


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
            rollback: {
                type: 'workouts/syncFailure',
                payload: { id: session.id },
                meta: {
                    handleConflict: true,
                },
            },
        },
    },
});
