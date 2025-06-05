// WorkoutDetail.tsx
import React, {useEffect, useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  WorkoutTemplate,
  workoutTemplates,
} from '../../services/sync/mockWorkoutTemplates';
import CustomText from '../../components/common/CustomText';
import {RootStackParamList} from '../../navigation/navigation.types';
import {
  responsiveFontSize,
  windowHeight,
  windowWidth,
} from '../../constants/sizes';
type WorkoutDetailRouteProp = RouteProp<RootStackParamList, 'WorkoutDetail'>;

import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

const WorkoutDetail = () => {
  const route = useRoute<WorkoutDetailRouteProp>();
  const {workoutId} = route.params;
  const [workout, setWorkout] = useState<WorkoutTemplate | undefined | null>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workoutId) {
      setLoading(false);
      return;
    }
    const foundWorkout = workoutTemplates.find(item => item.id === workoutId);
    setWorkout(foundWorkout);
    setLoading(false);
  }, [workoutId]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!workout) {
    return (
      <View style={styles.centeredContainer}>
        <CustomText
          fontSize={18}
          textMessage="Workout not found."
          color={colors.error}
          align="center"
        />
      </View>
    );
  }

  if (!workout) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <CustomText
          fontSize={28}
          textMessage={workout.name}
          color={colors.textPrimary}
          align="center"
        />
        {workout.description && (
          <CustomText
            fontSize={16}
            textMessage={workout.description}
            color={colors.textSecondary}
            align="center"
          />
        )}
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <CustomText
            fontSize={16}
            textMessage="Duration"
            color={colors.primary}
          />
          <CustomText
            fontSize={18}
            textMessage={`${workout.minutes} min`}
            color={colors.textPrimary}
          />
        </View>
        <View style={styles.metricItem}>
          <CustomText
            fontSize={16}
            textMessage="Calories"
            color={colors.primary}
          />
          <CustomText
            fontSize={18}
            textMessage={`${workout.calories} cal`}
            color={colors.textPrimary}
          />
        </View>
      </View>

      <View style={styles.exercisesHeaderContainer}>
        <CustomText
          fontSize={22}
          textMessage="Exercises"
          color={colors.textPrimary}
          align="center"
        />
      </View>
      {workout.exercises.map(ex => (
        <View key={ex.id} style={styles.exerciseCard}>
          <CustomText
            fontSize={18}
            textMessage={ex.name}
            color={colors.exercise}
          />
          <View style={styles.exerciseDetailsContainer}>
            <CustomText
              fontSize={15}
              textMessage={`Sets: ${ex.sets}`}
              color={colors.textSecondary}
            />
            <CustomText
              fontSize={15}
              textMessage={`Reps: ${ex.reps}`}
              color={colors.textSecondary}
            />
            {ex.weight && (
              <CustomText
                fontSize={15}
                textMessage={`Weight: ${ex.weight}`}
                color={colors.textSecondary}
              />
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: windowWidth * 0.05,
    backgroundColor: colors.backgroundLight,
  },
  headerContainer: {
    marginBottom: windowHeight * 0.04,
    alignItems: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  exercisesHeaderContainer: {
    marginVertical: 12,
    paddingVertical: 8,
  },
  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  exerciseDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 4,
  },
});

export default WorkoutDetail;
