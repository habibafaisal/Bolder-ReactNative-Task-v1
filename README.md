# 🏋️‍♂️ Workout Logger - React Native Technical Assessment

Welcome to the **Bolder.fit** Technical Challenge! We're excited to see how you tackle building a production-ready offline-first workout logging app.

> **What we're really testing:** Your mastery of Redux-Persist + Redux Offline architecture in a real-world fitness application context.

## 🎯 The Mission

Build a workout logging app that works **seamlessly offline** and **syncs intelligently** when back online. Think of it as your pocket gym buddy that never loses your data, even when your gym's WiFi is terrible! 💪

### 🔥 The Three Pillars We're Evaluating

| Pillar | Weight | What We're Looking For |
|--------|---------|----------------------|
| **🗃️ Redux Offline + Persist Mastery** | 40% | Custom retry logic, conflict resolution, schema migrations |
| **📱 Workout Logging Interface** | 25% | Performance with large datasets, intuitive UX |
| **🔄 Sync Intelligence** | 20% | Background sync, partial failures, edge cases |
| **🏗️ Code Architecture** | 15% | Clean patterns, TypeScript, production readiness |

---

## 🚀 Getting Started

### Demo First!
Before diving in, check out our [**Interactive Demo**](https://raheememad.github.io/Live_Demo/) and  [**Demo's Repo Documentation**](https://github.com/RaheemEmad/Live_Demo) to see exactly what you're building. Toggle the network on/off to see the offline magic in action! ✨

### Time Allocation: 72 Hours
- **Day 1**: Redux architecture setup (Redux-Persist + Redux Offline)
- **Day 2**: Workout logging features + performance optimization  
- **Day 3**: Polish, testing, and documentation

⏳ Timeframe: This challenge is designed to be completed in ~3 working days. We understand people have different schedules, so if you need a bit more time, just let us know — we’re flexible, as long as communication is clear.

---

## 🎪 Core Requirements (The Must-Haves)

### 1. 🗃️ Redux Offline + Redux-Persist Architecture (40%)
> **This is where you shine!** We want to see you go beyond basic setup.

**Your Redux State Should Look Like:**
```typescript
{
  workouts: {
    sessions: WorkoutSession[],    // Your logged workouts
    exercises: Exercise[],         // Exercise database (1000+ items)
    categories: Category[],        // Exercise categories
    stats: UserStats              // Progress tracking
  },
  offline: {
    online: boolean,               // Network status
    outbox: Action[],             // Queued actions
    netInfo: NetworkInfo,         // Connection details
    retryScheduled: boolean       // Retry state
  },
  _persist: {
    version: number,              // Schema version
    rehydrated: boolean          // Hydration status
  }
}
```

**🏆 Advanced Challenges We Want to See:**
- **Custom Retry Logic**: Not just default exponential backoff
- **Conflict Resolution**: What happens when two devices sync the same workout?
- **Schema Migrations**: Handle evolving workout data structures
- **Rollback Mechanisms**: Failed optimistic updates should gracefully recover
- **Custom Middleware**: Validate and sanitize workout data before persistence

### 2. 📱 Advanced Workout Logging Interface (25%)
> **Performance is king!** Your app should handle real gym usage.

**Essential Features:**
- ⏱️ **Live Session Tracking**: Sets, reps, weight, rest timers
- 🔍 **Exercise Search**: Fast filtering through 1000+ exercises
- 📋 **Workout Templates**: Save and reuse favorite routines
- 📈 **Progress Tracking**: Historical data with trend analysis
- ⏰ **Background Timers**: Keep timing even when app is backgrounded

**🚀 Performance Targets:**
- **FlatList Mastery**: Smooth scrolling through 500+ workout sessions
- **Search Optimization**: Debounced search with virtualization
- **Memory Efficiency**: No memory leaks during long workout sessions
- **Smooth Animations**: 60fps during active workout tracking

### 3. 🔄 Offline Data Synchronization (20%)
> **The magic happens here!** Make data sync feel invisible.

**Sync Scenarios to Handle:**
- 📶 **Background Sync**: Queue actions when offline, sync when online
- ⚡ **Delta Sync**: Only sync changes, not entire datasets
- 🔄 **Partial Failures**: Handle server hiccups gracefully
- 🔧 **Recovery Logic**: App killed mid-sync? No problem!
- 🤝 **Multi-Device**: Handle conflicts when syncing from multiple devices

---

## 🎨 Bonus Challenges (Pick Your Favorites!)

Choose **2 of these 4** bonus challenges to really impress us:

### Option A: 🧭 Advanced Navigation (10% bonus)
- Deep linking: `fitnessapp://workout/session/123`
- Navigation state persistence across app restarts
- Proper TypeScript navigation typing

### Option B: 📊 Performance Monitoring (10% bonus)
- Custom performance metrics
- Memory leak detection
- Bundle size optimization
- Startup time improvements

### Option C: 📱 Native Integration (10% bonus)
- Custom native modules for background timers
- Biometric authentication
- Platform-specific optimizations

### Option D: 🛡️ Advanced Error Handling (10% bonus)
- Comprehensive error boundaries
- Custom `useRetryableOperation()` hook
- Memory warning handling

---

## 🏗️ Project Structure (Make It Clean!)

```
src/
├── store/                  # 🎯 PRIMARY FOCUS AREA
│   ├── slices/
│   │   ├── workouts.ts    # Workout data management
│   │   ├── offline.ts     # Offline state management
│   │   └── exercises.ts   # Exercise database
│   ├── middleware/
│   │   ├── offline.ts     # Redux Offline config ⭐
│   │   ├── persistence.ts # Redux-Persist setup ⭐
│   │   └── sync.ts        # Custom sync logic ⭐
│   ├── transforms/        # Persist transforms
│   └── migrations/        # Schema migrations
├── components/
│   ├── workout/          # Workout-specific UI
│   └── common/           # Reusable components
├── screens/
│   ├── WorkoutSession/   # Live workout tracking
│   ├── WorkoutHistory/   # Historical data
│   └── WorkoutPlanner/   # Routine management
├── services/
│   ├── sync/            # Sync logic
│   ├── storage/         # Storage utilities
│   └── api/             # Network requests
└── utils/
    ├── offline/         # Offline utilities
    └── performance/     # Performance helpers
```

---

## 🎥 Demo Video Requirements (5-7 minutes)

Your video should showcase:

1. **🔌 Offline Magic**: Show the app working without internet
2. **🔄 Sync Dance**: Demonstrate data syncing when connection returns
3. **⚔️ Conflict Resolution**: Show how conflicts are handled
4. **🚀 Performance**: Smooth scrolling through large datasets
5. **🛠️ Edge Cases**: Recovery from sync failures

**Pro Tip**: Use your phone's airplane mode to demonstrate offline functionality!

---

## 🧪 What Makes a Winning Submission

### ✅ Success Indicators
- **Offline-First Mindset**: App works perfectly without network
- **Redux Offline Expertise**: Custom configuration, not just defaults
- **Performance Awareness**: Smooth with realistic data loads
- **Production Readiness**: Comprehensive error handling
- **Clear Documentation**: ADRs for architectural decisions

### ❌ Disqualifying Factors
- Using Redux Offline with only default configuration
- Missing conflict resolution implementation
- Memory leaks in list rendering
- No offline functionality demonstration
- Poor sync failure handling

---

## 📚 Documentation Requirements

Create these key documents:

### 1. **Architecture Decision Records (ADRs)**
- Why did you choose your specific Redux Offline configuration?
- How does your conflict resolution strategy work?
- What trade-offs did you make for performance?

### 2. **README.md**
- Setup instructions
- Architecture overview
- Performance optimizations explained

### 3. **Testing Strategy**
- Unit tests for Redux slices (especially offline logic)
- Integration tests for sync scenarios
- Performance benchmarks

---

## 🎪 Fun Challenges to Consider

- **The Airplane Mode Test**: Does your app work on a flight?
- **The Gym WiFi Challenge**: Handle spotty connections gracefully
- **The Power User Test**: Can it handle someone who logs 5 workouts daily?
- **The Multi-Device Scenario**: Same user, multiple phones, data conflicts?

---

## 🤝 Need Help?

- **Stuck on Redux Offline?** Check the [official docs](https://github.com/redux-offline/redux-offline)
- **Redux-Persist questions?** Their [documentation](https://github.com/rt2zz/redux-persist) is excellent
- **Performance tips?** React Native's [performance guide](https://reactnative.dev/docs/performance) is your friend

---

## 🚀 Ready to Start?

1. **Fork this repository**
2. **Set up your development environment**
3. **Check out the demo** to understand the requirements
4. **Start with Redux architecture** (this is your foundation!)
5. **Build incrementally** and commit frequently
6. **Document your decisions** as you go

Remember: We're not just looking for working code—we want to see how you think about complex offline-first architecture problems. Show us your problem-solving process!

---

## 🏆 Powered by Bolder.fit

This challenge is brought to you by [**Bolder.fit**](https://bolder.fit/en) - where we're building the future of fitness technology. We believe in robust, offline-first applications that work as hard as our users do! 💪

**Good luck, and may your Redux store be ever-synchronized!** 🚀

---

*Questions? Found a bug in the requirements? Open an issue and we'll get back to you quickly!*
