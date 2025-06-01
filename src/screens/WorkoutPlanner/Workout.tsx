import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/common/CustomText';
import {colors} from '../../constants/colors';
import {responsiveFontSize} from '../../constants/sizes';
import ScreenHeader from '../../components/common/ScreenHeader';
import {Exercise} from '../../store/types/types';

const Workout = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [types, setTypes] = useState<Exercise[]>([]);

  const fetchWorkoutTypes = async () => {};
  useEffect(() => {
    fetchWorkoutTypes();
  }, []);

  const handleStartWorkout = () => {
    // Navigate to workout session
    navigation.navigate('WorkoutSession' as never);
  };

  const renderWorkoutCard = (workout: Exercise) => (
    <View key={workout.id} style={styles.workoutCard}>
      <View style={styles.workoutHeader}>
        <CustomText
          fontSize={responsiveFontSize(24)}
          color={colors.textPrimary}
          textMessage={workout.name}
        />
        <View
          style={[
            styles.syncedChip,
            {
              backgroundColor: workout.synced
                ? colors.success + '30'
                : colors.error + '30',
            },
          ]}>
          <CustomText
            fontSize={responsiveFontSize(14)}
            color={workout.synced ? colors.success : colors.error}
            textMessage={workout.synced ? 'Synced' : 'Not Synced'}
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <CustomText
            fontSize={responsiveFontSize(28)}
            color={colors.primary}
            textMessage={workout.minutes.toString()}
          />
          <CustomText
            fontSize={responsiveFontSize(14)}
            color={colors.textSecondary}
            textMessage="Minutes"
          />
        </View>

        <View style={styles.statBox}>
          <CustomText
            fontSize={responsiveFontSize(28)}
            color={colors.primary}
            textMessage={workout.exercises.toString()}
          />
          <CustomText
            fontSize={responsiveFontSize(14)}
            color={colors.textSecondary}
            textMessage="Exercises"
          />
        </View>

        <View style={styles.statBox}>
          <CustomText
            fontSize={responsiveFontSize(28)}
            color={colors.primary}
            textMessage={`${(workout.calories / 1000).toFixed(1)}k`}
          />
          <CustomText
            fontSize={responsiveFontSize(14)}
            color={colors.textSecondary}
            textMessage="Calories"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Workout Types" />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {types.map(renderWorkoutCard)}

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartWorkout}>
            <CustomText
              fontSize={responsiveFontSize(18)}
              color={colors.textInverse}
              textMessage="Start New Workout"
            />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  syncedChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
});
