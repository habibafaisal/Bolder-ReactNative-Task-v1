const customRetry = (action: any, retries: number, error: any, isOnline: boolean) => {
    const MAX_RETRIES = 5;

    if (!isOnline) {
        console.log('No network - retrying after 10 seconds');
        return 10000;
    }

    const status = error?.response?.status;

    if (status && status >= 400 && status < 500 && status !== 429) {
        console.log(`Permanent error ${status} - no retry`);
        return null;
    }

    if ((status && status >= 500) || !status) {
        if (retries >= MAX_RETRIES) {
            console.log('Max retries reached - giving up');
            return null;
        }

        const baseDelay = 1000;
        const jitter = Math.floor(Math.random() * 1000);
        const delay = baseDelay * Math.pow(2, retries) + jitter;

        console.log(`Retrying #${retries + 1} in ${delay} ms`);
        return delay;
    }

    return null;
};

export default customRetry;