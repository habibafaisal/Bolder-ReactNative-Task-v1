# React Native Mid/Senior Technical Assessment

Welcome! This challenge evaluates your expertise in building offline-first React Native applications with complex state persistence and synchronization patterns.

## 🎯 Objective

Build a **Workout Logging App** with robust offline capabilities using Redux-Persist and Redux Offline as the foundation for state management and data synchronization.

## ⏱ Time Limit

72 hours from repository fork.

## 🔥 Core Requirements (Must Complete All)

### 1. Redux Offline + Redux-Persist Architecture (40% of evaluation)

**Primary Focus**: Implement a bulletproof offline-first workout logging system

**State Structure**:
```javascript
{
  workouts: {
    sessions: [], // Individual workout sessions
    exercises: [], // Exercise database
    categories: [], // Exercise categories
    stats: {} // User statistics
  },
  offline: {
    online: boolean,
    outbox: [], // Pending actions
    netInfo: {}, // Network status
    retryScheduled: boolean
  },
  _persist: {
    version: number,
    rehydrated: boolean
  }
}
```

**Technical Requirements**:
- Configure Redux-Persist with proper transforms and migrations
- Implement Redux Offline with custom retry logic and conflict resolution
- Handle partial synchronization failures gracefully
- Implement rollback mechanisms for failed optimistic updates
- Create custom middleware for workout data validation and sanitization
- Handle schema migrations for evolving workout data structures

**Challenge Components**:
- **Optimistic Updates**: Log workouts instantly, sync later
- **Conflict Resolution**: Handle server conflicts when multiple devices sync
- **Retry Strategies**: Exponential backoff with jitter for failed sync attempts
- **Data Integrity**: Ensure workout data consistency across offline/online transitions

### 2. Advanced Workout Logging Interface (25% of evaluation)

**Primary Focus**: Performance-optimized workout tracking with complex data entry

**Features Required**:
- Real-time workout session tracking (sets, reps, weight, time)
- Exercise search and filtering (1000+ exercises in local database)
- Workout templates and routine management
- Progress tracking with historical data comparison
- Timer functionality with background state management

**Performance Requirements**:
- FlatList optimization for rendering 500+ workout sessions
- Virtualized exercise selection with search debouncing
- Smooth animations during active workout tracking
- Memory-efficient image handling for exercise demonstrations

### 3. Offline Data Synchronization (20% of evaluation)

**Technical Implementation**:
- Background sync queue management
- Delta sync for large workout datasets
- Conflict resolution algorithms (last-write-wins vs merge strategies)
- Network failure recovery with exponential backoff
- Partial sync handling for large workout histories

**Edge Cases to Handle**:
- App killed during sync process
- Network interruption mid-sync
- Server unavailable for extended periods
- Multiple app instances syncing simultaneously

## 🛠️ Complementary Features (Choose 2 of 4 for bonus points)

### Option A: Advanced Navigation & Deep Linking (10% bonus)
- React Navigation v6 with proper offline state persistence
- Deep linking to specific workouts: `fitnessapp://workout/session/123`
- Navigation state restoration after app restart
- Proper TypeScript navigation typing

### Option B: Performance Monitoring & Optimization (10% bonus)
- Custom performance monitoring for list rendering
- Memory leak detection and prevention
- Bundle size optimization
- Startup time optimization with lazy loading

### Option C: Native Integration (10% bonus)
- Custom native module for workout timer (background processing)
- Biometric authentication for app access
- Native gesture handling for workout interactions
- Platform-specific optimizations (iOS/Android)

### Option D: Advanced Error Handling (10% bonus)
- Comprehensive error boundaries with crash reporting
- Custom hook `useRetryableOperation()` with configurable strategies
- Memory warning handling
- Low storage scenario management

## 📋 Architecture Requirements

### Code Organization
```
src/
├── store/                  # Redux setup (PRIMARY FOCUS)
│   ├── slices/
│   │   ├── workouts.ts    # Workout data management
│   │   ├── offline.ts     # Offline state management
│   │   └── exercises.ts   # Exercise database
│   ├── middleware/
│   │   ├── offline.ts     # Redux Offline configuration
│   │   ├── persistence.ts # Redux-Persist setup
│   │   └── sync.ts        # Custom sync logic
│   ├── transforms/        # Persist transforms
│   └── migrations/        # Schema migrations
├── components/
│   ├── workout/          # Workout-specific components
│   └── common/           # Reusable components
├── screens/
│   ├── WorkoutSession/   # Active workout tracking
│   ├── WorkoutHistory/   # Historical data
│   └── WorkoutPlanner/   # Routine management
├── services/
│   ├── sync/            # Synchronization logic
│   ├── storage/         # Local storage utilities
│   └── api/             # Network requests
└── utils/
    ├── offline/         # Offline utilities
    └── performance/     # Performance helpers
```

### Technical Constraints
- **TypeScript**: Strict mode, no `any` types
- **Redux Offline**: Custom retry logic and conflict resolution required
- **Redux-Persist**: Custom transforms and migrations required
- **Performance**: Handle 1000+ workout sessions without frame drops
- **Testing**: Unit tests for Redux slices and offline logic
- **Accessibility**: Screen reader support for workout tracking

## 🧪 Evaluation Criteria (Weighted)

### Redux Offline Mastery (40%)
- Proper Redux Offline configuration and customization
- Effective conflict resolution strategies
- Robust retry mechanisms and error handling
- Understanding of offline-first architecture principles

### Redux-Persist Implementation (25%)
- Correct persistence configuration with transforms
- Schema migration handling
- Performance optimization for large datasets
- Proper rehydration handling

### Workout App Logic (20%)
- Intuitive workout tracking interface
- Efficient data structures for workout management
- Real-time updates and synchronization
- Performance under heavy data loads

### Code Quality & Architecture (15%)
- Clean separation of concerns
- Proper TypeScript usage
- Comprehensive error handling
- Production-ready code patterns

## 📋 Demonstration Requirements

### Code Quality
- ESLint/Prettier with strict configuration
- Meaningful commit messages following conventional commits
- Comprehensive README with offline architecture explanations

### Technical Documentation
- **ADR**: Document your Redux Offline configuration decisions
- **Sync Strategy**: Explain your conflict resolution approach
- **Performance**: Document optimization techniques used
- **Testing**: Include offline scenario test cases

### Video Demo (5-7 minutes)
**Must Cover**:
1. **Offline Functionality**: Demonstrate app working without network
2. **Sync Process**: Show data synchronization when network returns
3. **Conflict Resolution**: Demo how conflicts are handled
4. **Performance**: Show smooth operation with large datasets
5. **Edge Cases**: Demonstrate recovery from sync failures

### Testing Requirements
- Unit tests for Redux slices (especially offline logic)
- Integration tests for sync scenarios
- Performance benchmarks for workout list rendering
- Offline scenario testing

## 🚨 Success Indicators

A successful submission demonstrates:

- **Offline-First Mindset**: App functions seamlessly without network
- **Redux Offline Expertise**: Custom configuration beyond basic setup
- **Performance Awareness**: Smooth operation under realistic data loads
- **Production Readiness**: Comprehensive error handling and edge cases
- **Architectural Thinking**: Clear documentation of technical decisions

## 🚫 Disqualifying Factors

- Redux Offline used only with default configuration
- Missing conflict resolution implementation
- Memory leaks in workout list rendering
- No consideration for sync failure scenarios
- Insufficient offline functionality demonstration

## 💡 Bonus Points

- Custom Redux Offline effects for workout-specific logic
- Advanced conflict resolution beyond last-write-wins
- Performance optimizations with measurable improvements
- Creative solutions for large dataset synchronization
- Comprehensive offline testing scenarios

Remember: This assessment focuses on your ability to architect robust offline-first applications. We're looking for deep understanding of Redux Offline patterns and the challenges of mobile data synchronization.

**Good luck! 🚀**
