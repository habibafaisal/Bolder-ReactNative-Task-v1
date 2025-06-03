import { Middleware } from '@reduxjs/toolkit';
import { syncFailure } from '../slices/workoutsSlice';

export const conflictMiddleware: Middleware = store => next => action => {
    if (
        action?.meta?.offline?.completed === false &&
        action?.payload?.response?.status === 409 &&
        action?.payload?.serverVersion
    ) {
        const localWorkout = action.meta.offline.effect?.payload;
        const serverVersion = action.payload.serverVersion;

        store.dispatch(syncFailure({
            id: localWorkout.id,
            conflict: serverVersion,
        }));
    }

    return next(action);
};
