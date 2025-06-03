import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/common/CustomText';
import { colors } from '../../constants/colors';
import { responsiveFontSize } from '../../constants/sizes';
import ScreenHeader from '../../components/common/ScreenHeader';
import { Exercise } from '../../store/types/types';
import { WorkoutTemplate, workoutTemplates } from '../../services/sync/mockWorkoutTemplates';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../navigation/navigation.types';
import { debounce } from 'lodash';


type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WorkoutDetail'
>;
const Workout = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<WorkoutTemplate[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTypes, setFilteredTypes] = useState<WorkoutTemplate[]>([]);

  const searchWorkouts = debounce((query: string) => {
    const lower = query.toLowerCase();
    const filtered = types.filter(w =>
      w.name.toLowerCase().includes(lower) ||
      w.description?.toLowerCase().includes(lower)
    );
    setFilteredTypes(filtered);
  }, 300);

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    searchWorkouts(text);
  };

  useEffect(() => {
    fetchWorkoutTypes();
  }, []);

  useEffect(() => {
    setFilteredTypes(types);
  }, [types]);

  const fetchWorkoutTypes = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTypes(workoutTemplates);
    } catch (error) {
      console.error('Failed to fetch workout types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWorkout = () => {
    navigation.navigate('WorkoutSession' as never);
  };

  const renderWorkoutCard = (workout: Exercise) => (
    <TouchableOpacity
      key={workout.id}
      style={styles.workoutCard}
      onPress={() => navigation.navigate('WorkoutDetail', { workoutId: workout.id })}
    >
      <View style={styles.workoutHeader}>
        <CustomText
          fontSize={responsiveFontSize(24)}
          color={colors.textPrimary}
          textMessage={workout.name}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <CustomText
            fontSize={responsiveFontSize(28)}
            color={colors.primary}
            textMessage={workout?.minutes?.toString()}
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
            textMessage={workout.exercises.length}
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
            textMessage={workout.calories + 'k'}
          />
          <CustomText
            fontSize={responsiveFontSize(14)}
            color={colors.textSecondary}
            textMessage="Calories"
          />
        </View>
      </View>
    </TouchableOpacity>
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
    shadowOffset: { width: 0, height: 2 },
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
