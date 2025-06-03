import { WorkoutSession } from "../../store/types/types";

export const completeWorkoutOffline = (workout: WorkoutSession) => ({
    type: 'workouts/addSession',
    payload: workout,
    meta: {
        offline: {
            effect: () => {
                console.log('Effect called');
                return Promise.resolve(workout);
            },
            commit: { type: 'workouts/syncSuccess', meta: { id: workout.id } },
            rollback: { type: 'workouts/syncFailure', meta: { id: workout.id } },
        },
    },
});