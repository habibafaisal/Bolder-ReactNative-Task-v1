import workoutsReducer, { addSession, WorkoutsState } from "../workoutsSlice";

describe('workoutsSlice reducer', () => {
    it('should handle addSession', () => {
        const initialState: WorkoutsState = {
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
        };

        const payload = {
            id: '123',
            date: '2025-06-04',
            duration: 1,
            exercises: [],
            synced: false,
        };

        const state = workoutsReducer(initialState, addSession(payload));
        expect(state.sessions).toHaveLength(1);
        expect(state.sessions[0]).toEqual(payload);
    });
});
