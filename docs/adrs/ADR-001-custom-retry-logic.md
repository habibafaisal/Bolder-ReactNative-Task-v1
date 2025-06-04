# ADR-001: Custom Retry Logic for Redux Offline

## Context
Redux Offline provides a built-in retry mechanism, but it uses a fixed exponential backoff strategy and retries all failures indiscriminately. I needed more granular control, especially to avoid retrying certain client-side validation errors.

## Decision
Implemented a custom retry strategy inside `src/store/middleware/offlineConfig.ts` using `retry(action, retries)`. It:
- Retries network errors up to a limit.
- Skips retries for 4xx client-side errors.
- Adds jitter and exponential backoff to reduce server strain.

## Trade-offs
- ✅ More intelligent handling of failure types
- ✅ Prevents retry loops for bad data
- ❌ Slightly more complexity vs default

## Alternatives Considered
- Using Redux Offline's default retry (too broad)
- Manual queueing of retryable actions (more boilerplate)
