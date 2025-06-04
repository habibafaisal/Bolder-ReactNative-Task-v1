import { customOfflineConfig } from "../offline";

describe('offlineConfig.effect', () => {
    const mockSession = {
        id: 'abc',
        date: '2025-06-04',
        duration: 1,
        exercises: [],
        synced: false,
    };

    const action = {
        type: 'workouts/addSession',
        payload: mockSession,
    };

    it('should simulate conflict rejection with serverVersion', async () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.3); // force conflict

        await expect(customOfflineConfig.effect!(null, action)).rejects.toMatchObject({
            response: { status: 409 },
            serverVersion: expect.objectContaining({
                id: expect.stringMatching(/-server$/),
                synced: true,
            }),
        });

        jest.spyOn(Math, 'random').mockRestore();
    });

    it('should resolve when no conflict', async () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.8);

        const result = await customOfflineConfig.effect!(null, action);
        expect(result).toEqual(mockSession);

        jest.spyOn(Math, 'random').mockRestore();
    });
});
