import { Middleware, PayloadAction } from '@reduxjs/toolkit';

export const validateWorkoutMiddleware: Middleware = store => next => (action: unknown) => {
    if (
        typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        (action as any).type === 'workouts/addSession'
    ) {
        const workout = (action as any).payload;

        if (!workout?.id || !workout?.date) {
            console.warn('[Middleware] Invalid workout payload:', workout);
            return;
        }
    }

    return next(action);
};
