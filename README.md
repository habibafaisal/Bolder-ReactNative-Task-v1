# 🏋️ BolderTask – Offline-First Workout Planner

BolderTask is a fully offline-capable workout planning app built with React Native and Redux Offline. It supports custom retry logic, conflict resolution, data migrations, and performance optimizations with FlashList.

---

## 📦 Setup Instructions

```bash
git clone https://github.com/your-org/boldertask.git
cd boldertask
npm install
npm run android   # or npm run ios
npm test
```

---

## 🧠 Architecture Overview

### Redux + Redux Offline

- Redux Toolkit used for state management
- redux-offline integrated for:
  - Custom retry behavior
  - Conflict resolution
  - Offline queue persistence
  - Middleware to enforce data integrity

### Conflict Resolution

- Simulated with 50% probability (in absence of backend)
- On conflict:
  - Shows both local and server versions
  - User chooses which version to keep
- Conflicts are not retried (assumed data is outdated)

### Middleware

- Validates every workout:
  - Ensures presence of ID and timestamp
- Middleware injected before enqueueing offline action

### Migrations

- Introduced `isArchived` flag for workouts
- Ensures smooth data shape changes without breaking existing data

---

## 🧠 Architecture Decision Records (ADRs)

Key architectural decisions are documented in the [`docs/adrs`](./docs/adrs) folder:

- [ADR-001: Custom Retry Logic](./docs/adrs/ADR-001-custom-retry-logic.md)
- [ADR-002: Conflict Resolution Strategy](./docs/adrs/ADR-002-conflict-resolution.md)
- [ADR-003: Schema Migration Strategy](./docs/adrs/ADR-003-schema-migrations.md)


## ⚙️ Performance Optimizations

- ✅ FlashList replaces FlatList for better memory usage and speed
- ✅ Debounced search implemented on Workout screen
- ✅ Avoided general-purpose mapping during render (improved efficiency)
- ✅ Debounced search for smoother UX


---

## 🔗 Deep Linking

```ts
export const linking = {
  prefixes: ['boldertask://', 'https://boldertask.com'],
  config: {
    screens: {
      Workout: { path: 'workout' },
      WorkoutDetail: { path: 'workout/:id' },
    },
  },
};
```

Supported links:

- `boldertask://workout`
- `boldertask://workout/:id`

---

## 🧪 Testing Strategy

Test files include:

- `src/store/slices/__tests__/workoutsSlice.test.ts`
- `src/store/middleware/__tests__/offlineConfig.test.ts`
- `src/store/middleware/__tests__/customRetry.test.ts`


Run tests:

```bash
npm test src/store/slices/__tests__/workoutsSlice.test.ts

```


Example output:

```
> HabibaFaisal_BolderTask@0.0.1 test
> jest src/store/slices/__tests__/workoutsSlice.test.ts

  console.log
    exists false

      at log (src/store/slices/workoutsSlice.ts:49:15)
          at Array.reduce (<anonymous>)

PASS src/store/slices/__tests__/workoutsSlice.test.ts
  workoutsSlice reducer
    ✓ should handle addSession (31 ms)

Test Suites: 1 passed, 1 total  
Tests:       1 passed, 1 total  
Snapshots:   0 total  
Time:        0.793 s, estimated 1 s  
Ran all test suites matching /src\/store\/slices\/__tests__\/workoutsSlice.test.ts/i.

```

---

## ✅ Completed Features

- [x] Offline Redux configuration
- [x] Custom retry logic
- [x] Conflict resolution with user decision
- [x] FlashList for performance
- [x] Unit tests for offline slice, retry, and config

---