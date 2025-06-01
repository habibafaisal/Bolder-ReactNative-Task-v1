// workoutSync.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {Dispatch} from 'redux';
import {WorkoutSession} from '../../store/types/types';
import {
  addSession,
  loadWorkoutsFromStorage,
  setSyncFailed,
  setSyncing,
  updateSession,
} from '../../store/slices/workoutsSlice';

// export const syncPendingWorkouts = async (
//   dispatch: Dispatch,
//   getState: () => {workouts: {sessions: WorkoutSession[]}},
// ) => {
//   const state = getState();
//   const pending = state.workouts.sessions.filter(session => !session.synced);
//   if (pending.length === 0) return;

//   dispatch(setSyncing(true));
//   dispatch(setSyncFailed(false));

//   const updatedSessions = [...state.workouts.sessions];

//   try {
//     for (const session of pending) {
//       // Simulate network delay
//       await new Promise(resolve => setTimeout(resolve, 500));

//       const randomFail = Math.random() < 0.2;

//       if (randomFail) {
//         // Mark this session as failed to sync
//         console.log('Sync failed for session', session.id);
//         const failedIndex = updatedSessions.findIndex(s => s.id === session.id);
//         if (failedIndex !== -1) {
//           updatedSessions[failedIndex] = {
//             ...session,
//             syncFailed: true,
//             synced: false,
//           };
//         }
//         continue;
//       }

//       // If success
//       const index = updatedSessions.findIndex(s => s.id === session.id);
//       console.log('Sync success for session', session.id);
//       if (index !== -1) {
//         updatedSessions[index] = {
//           ...session,
//           synced: true,
//           syncFailed: false,
//         };
//       }
//     }

//     // Dispatch updated sessions
//     for (const session of updatedSessions) {
//       dispatch(updateSession(session));
//     }

//     // Persist to AsyncStorage
//     await AsyncStorage.setItem('@workouts', JSON.stringify(updatedSessions));
//     dispatch(setSyncing(false));
//   } catch (error) {
//     console.error('Sync error', error);
//     dispatch(setSyncing(false));
//     dispatch(setSyncFailed(true));
//   }
// };

// export const watchNetworkAndSync = (
//   dispatch: Dispatch,
//   getState: () => {workouts: {sessions: WorkoutSession[]}},
// ) => {
//   const unsubscribe = NetInfo.addEventListener(state => {
//     if (state.isConnected) {
//       console.log('Network online — syncing pending workouts');
//       syncPendingWorkouts(dispatch, getState);
//     } else {
//       console.log('Network offline');
//     }
//   });

//   return unsubscribe;
// };
