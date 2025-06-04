import 'react-native-get-random-values';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import CustomText from '../../components/common/CustomText';
import { colors } from '../../constants/colors';
import { responsiveFontSize, windowWidth, windowHeight } from '../../constants/sizes';
import { mockExercises } from '../../services/sync/mockData';
import { resetSession, updateSession } from '../../store/slices/workoutsSlice';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Exercise, WorkoutSession as WorkoutSessionType } from '../../store/types/types';
import { createWorkoutSession } from '../../services/sync/sync';
import { v4 as uuidv4 } from 'uuid';

const WorkoutSession = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [duration, setDuration] = useState<string>('00:00');
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [exercisesCount, setExercisesCount] = useState<number>(2);
  const [setsCount, setSetsCount] = useState<number>(12);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const isConnected = useSelector((state: RootState) => state.offline?.online);
  const sessions = useSelector((state: RootState) => state.workouts.sessions);
  const [conflictSession, setConflictSession] = useState<WorkoutSessionType | null>(null);
  const [showWorkoutCompleteModal, setShowWorkoutCompleteModal] =
    useState<boolean>(false);
  const [showConflictModal, setShowConflictModal] = useState<boolean>(false);
  const conflictedSession = useSelector((state: RootState) =>
    state.workouts.sessions.find(session => session.conflict)
  );
  useEffect(() => {
    setExercises(mockExercises);
    setExercisesCount(mockExercises.length);
    setSetsCount(mockExercises.reduce((acc, ex) => acc + (ex.sets ?? 0), 0));
  }, []);
  // console.log('conflictedSession', sessions);
  useEffect(() => {
    if (conflictedSession) {
      setConflictSession(conflictedSession);
      setShowConflictModal(true);
    }
  }, [conflictedSession]);

  useEffect(() => {
    if (!isTimerRunning) return;

    let startTime = Date.now() - durationSeconds * 1000;
    const timer = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setDurationSeconds(elapsedTime);
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      setDuration(
        `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const handleResolveConflict = (choice: 'local' | 'remote') => {
    if (!conflictSession) return;

    const resolvedData =
      choice === 'local'
        ? conflictSession
        : {
          ...conflictSession.conflict.remote,
          id: conflictSession.id, // preserve local ID
        };

    // Dispatch an action to update the session and retry sync
    dispatch(updateSession({ session: resolvedData }));

    // Clear modal and conflict state
    setShowConflictModal(false);
    setConflictSession(null);
  };

  const handleAddSet = (index: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      sets: updatedExercises[index].sets + 1,
    };
    setExercises(updatedExercises);
    setSetsCount(setsCount + 1);
  };



  const handleFinishWorkout = async () => {
    if (isSubmitting) return;

    setIsTimerRunning(false);
    setIsSubmitting(true);

    try {
      const newCompletedWorkout: WorkoutSessionType = {
        id: uuidv4(),
        date: new Date().toISOString().split('T')[0],
        duration: durationSeconds,
        exercises: [...exercises],
        synced: false,
      };
      dispatch(createWorkoutSession(newCompletedWorkout));

      setShowWorkoutCompleteModal(true);
      // dispatch(resetSession());
    } catch (error) {
      console.error('Error finishing workout:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startNewWorkout = () => {
    // Reset all workout state
    setDuration('00:00');
    setDurationSeconds(0);
    setIsTimerRunning(true);
    setShowWorkoutCompleteModal(false);
  };

  const closeModal = () => {
    setShowWorkoutCompleteModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header section */}
        <View style={styles.headerContainer}>
          <CustomText
            fontSize={responsiveFontSize(28)}
            color={colors.textPrimary}
            textMessage="Current Session"
          />
          <TouchableOpacity style={styles.liveTrackingButton}>
            <CustomText
              fontSize={responsiveFontSize(16)}
              color={colors.textPrimary}
              textMessage="Live Tracking"
            />
          </TouchableOpacity>
        </View>

        {/* Stats section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <CustomText
              fontSize={responsiveFontSize(32)}
              color={colors.primary}
              textMessage={duration}
            />
            <CustomText
              fontSize={responsiveFontSize(16)}
              color={colors.textSecondary}
              textMessage="Duration"
            />
          </View>

          <View style={styles.statBox}>
            <CustomText
              fontSize={responsiveFontSize(32)}
              color={colors.primary}
              textMessage={exercisesCount.toString()}
            />
            <CustomText
              fontSize={responsiveFontSize(16)}
              color={colors.textSecondary}
              textMessage="Exercises"
            />
          </View>

          <View style={styles.statBox}>
            <CustomText
              fontSize={responsiveFontSize(32)}
              color={colors.primary}
              textMessage={setsCount.toString()}
            />
            <CustomText
              fontSize={responsiveFontSize(16)}
              color={colors.textSecondary}
              textMessage="Sets"
            />
          </View>
        </View>

        {/* Exercises section */}
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseContainer}>
            <View>
              <CustomText
                fontSize={responsiveFontSize(22)}
                color={colors.textPrimary}
                textMessage={exercise.name}
              />
              <CustomText
                fontSize={responsiveFontSize(16)}
                color={colors.textSecondary}
                textMessage={`${exercise.sets} sets x ${exercise.reps} reps`}
              />
            </View>
            <TouchableOpacity
              style={styles.addSetButton}
              onPress={() => handleAddSet(index)}>
              <CustomText
                fontSize={responsiveFontSize(16)}
                color={colors.textInverse}
                textMessage="Add Set"
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Network status indicator */}
        <View style={styles.networkStatus}>
          <View
            style={[
              styles.networkIndicator,
              { backgroundColor: isConnected ? colors.success : colors.error },
            ]}
          />
          <CustomText
            fontSize={responsiveFontSize(14)}
            color={colors.textSecondary}
            textMessage={isConnected ? 'Online ✅' : 'Offline 🔌'}
          />
        </View>

        {/* Finish workout button */}
        <TouchableOpacity
          style={[
            styles.finishButton,
            isSubmitting && styles.finishButtonDisabled,
          ]}
          onPress={handleFinishWorkout}
          disabled={isSubmitting}>
          <CustomText
            fontSize={responsiveFontSize(18)}
            color={colors.textInverse}
            textMessage={isSubmitting ? 'Saving...' : 'Finish Workout'}
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Workout Complete Modal */}
      <Modal
        visible={showWorkoutCompleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowWorkoutCompleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CustomText
              fontSize={responsiveFontSize(24)}
              color={colors.textPrimary}
              textMessage="Workout Complete!"
            />
            <CustomText
              fontSize={responsiveFontSize(18)}
              color={colors.textSecondary}
              textMessage={`Duration: ${duration}`}
            />
            <CustomText
              fontSize={responsiveFontSize(18)}
              color={colors.textSecondary}
              textMessage={`${exercisesCount} exercises, ${setsCount} sets`}
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.startNewButton]}
                onPress={startNewWorkout}>
                <CustomText
                  fontSize={responsiveFontSize(18)}
                  color={colors.textInverse}
                  textMessage="Start New Workout"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.finishButton]}
                onPress={closeModal}>
                <CustomText
                  fontSize={responsiveFontSize(18)}
                  color={colors.textInverse}
                  textMessage="Close"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showConflictModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConflictModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CustomText
              fontSize={responsiveFontSize(24)}
              color={colors.textPrimary}
              textMessage="Conflict Detected!"
            />
            <CustomText
              fontSize={responsiveFontSize(18)}
              color={colors.textSecondary}
              textMessage="A conflict occurred while syncing your workout session."
            />
            {/* Display details of the local and remote sessions */}
            <View style={styles.conflictDetails}>
              <CustomText
                fontSize={responsiveFontSize(16)}
                color={colors.textPrimary}
                textMessage="Your Version:"
              />
              {/* Display local session details */}
              <CustomText
                fontSize={responsiveFontSize(14)}
                color={colors.textSecondary}
                textMessage={JSON.stringify(conflictSession)}
              />
              <CustomText
                fontSize={responsiveFontSize(16)}
                color={colors.textPrimary}
                textMessage="Server Version:"
              />
              {/* Display remote session details */}
              <CustomText
                fontSize={responsiveFontSize(14)}
                color={colors.textSecondary}
                textMessage={JSON.stringify(conflictSession?.conflict?.remote)}
              />
            </View>
            {/* Add buttons to resolve the conflict */}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.resolveButton]}
                onPress={() => handleResolveConflict('local')}
              >
                <CustomText fontSize={18} color={colors.textInverse} textMessage="Keep My Version" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.resolveButton]}
                onPress={() => handleResolveConflict('remote')}
              >
                <CustomText fontSize={18} color={colors.textInverse} textMessage="Use Server Version" />
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WorkoutSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: windowWidth * 0.04,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: windowHeight * 0.02,
  },
  liveTrackingButton: {
    backgroundColor: '#f8d7da',
    paddingHorizontal: windowWidth * 0.04,
    paddingVertical: windowHeight * 0.01,
    borderRadius: windowWidth * 0.05,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: windowWidth * 0.03,
    padding: windowWidth * 0.04,
    marginBottom: windowHeight * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  exerciseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: windowHeight * 0.03,
  },
  addSetButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: windowWidth * 0.04,
    paddingVertical: windowHeight * 0.012,
    borderRadius: windowWidth * 0.02,
  },
  finishButton: {
    backgroundColor: colors.primary,
    paddingVertical: windowHeight * 0.02,
    borderRadius: windowWidth * 0.075,
    alignItems: 'center',
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.03,
    // Gradient effect with background color
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  finishButtonDisabled: {
    backgroundColor: colors.disabled,
    shadowColor: colors.disabled,
  },
  networkStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: windowHeight * 0.01,
  },
  networkIndicator: {
    width: windowWidth * 0.025,
    height: windowWidth * 0.025,
    borderRadius: windowWidth * 0.0125,
    marginRight: windowWidth * 0.02,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: windowWidth * 0.05,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: windowWidth * 0.04,
    padding: windowWidth * 0.06,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalButtonsContainer: {
    flexDirection: 'column',
    width: '100%',
    marginTop: windowHeight * 0.03,
  },
  modalButton: {
    paddingVertical: windowHeight * 0.02,
    borderRadius: windowWidth * 0.075,
    alignItems: 'center',
    marginTop: windowHeight * 0.015,
    width: '100%',
  },
  startNewButton: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
