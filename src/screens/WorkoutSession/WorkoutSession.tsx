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
import { responsiveFontSize } from '../../constants/sizes';
import { mockExercises } from '../../services/sync/mockData';
import { resetSession } from '../../store/slices/workoutsSlice';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { Exercise, WorkoutSession as WorkoutSessionType } from '../../store/types/types';
import { completeWorkoutOffline } from '../../services/sync/sync';

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
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showWorkoutCompleteModal, setShowWorkoutCompleteModal] =
    useState<boolean>(false);
  const [completedWorkout, setCompletedWorkout] = useState<WorkoutSessionType | null>(
    null,
  );
  useEffect(() => {
    setExercises(mockExercises);
    setExercisesCount(mockExercises.length);
    setSetsCount(mockExercises.reduce((acc, ex) => acc + (ex.sets ?? 0), 0));
  }, []);

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
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        duration: durationSeconds,
        exercises: [...exercises],
        synced: false,
      };
      dispatch(completeWorkoutOffline(newCompletedWorkout));

      setCompletedWorkout(newCompletedWorkout);
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
    setCompletedWorkout(null);
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
            textMessage={isConnected ? 'Online' : 'Offline'}
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
    </View>
  );
};

export default WorkoutSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  liveTrackingButton: {
    backgroundColor: '#f8d7da',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
    marginBottom: 24,
  },
  addSetButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  finishButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
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
    marginVertical: 8,
  },
  networkIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
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
    marginTop: 24,
  },
  modalButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
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
