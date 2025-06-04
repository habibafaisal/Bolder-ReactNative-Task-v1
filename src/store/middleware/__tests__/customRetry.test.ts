import customRetry from "../customRetry";

describe('customRetry logic', () => {
    const dummyAction = { type: 'test/action' };

    it('should not retry on conflict', () => {
        const error = {
            response: { status: 409 },
            serverVersion: { id: '123', synced: true },
        };

        const result = customRetry(dummyAction, 0, error, true);
        expect(result).toBe(false);
    });

    it('should not retry on 400-level permanent errors', () => {
        const error = {
            response: { status: 404 },
        };

        const result = customRetry(dummyAction, 0, error, true);
        expect(result).toBeNull();
    });

    it('should retry with backoff on 500 error', () => {
        const error = {
            response: { status: 500 },
        };

        const result = customRetry(dummyAction, 2, error, true);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
    });

    it('should fallback to error in action.meta if error is undefined', () => {
        const actionWithMeta = {
            type: 'test/action',
            meta: {
                lastError: {
                    response: { status: 409 },
                    serverVersion: { id: '999', synced: true },
                },
            },
        };

        const result = customRetry(actionWithMeta, 0, undefined, true);
        expect(result).toBe(false);
    });
});
