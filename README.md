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

## ⚙️ Performance Optimizations

- ✅ FlashList replaces FlatList for better memory usage and speed
- ✅ Debounced search implemented on Workout screen
- ✅ Avoided general-purpose mapping during render (improved efficiency)

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

Run tests:

```bash
npm test
```

Test files include:

- `src/store/slices/__tests__/workoutsSlice.test.ts`
- `src/store/middleware/__tests__/offlineConfig.test.ts`
- `src/store/middleware/__tests__/customRetry.test.ts`

Example output:

```
PASS src/store/slices/__tests__/workoutsSlice.test.ts
✓ should handle addSession
```

---

## ✅ Completed Features

- [x] Offline Redux configuration
- [x] Custom retry logic
- [x] Conflict resolution with user decision
- [x] FlashList for performance
- [x] Unit tests for offline slice, retry, and config

---

## 🚧 In Progress / To Do

- [ ] Debounced Search (Workout screen)
- [ ] README and Documentation finalization
- [ ] Demo screen or video

---

## 📄 License

MIT License – © 2025 Your Name or Organization
