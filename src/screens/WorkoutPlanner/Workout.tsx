import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/common/CustomText';
import { colors } from '../../constants/colors';
import { responsiveFontSize, windowWidth, windowHeight } from '../../constants/sizes';
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
  const navigation = useNavigation<NavigationProp>(); // Moved up for keyExtractor
  const keyExtractor = useCallback((item: WorkoutTemplate) => item.id.toString(), []);
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
      await new Promise(resolve => setTimeout(resolve, 100));
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

  const renderWorkoutCard = useCallback(({ item: workout }: { item: WorkoutTemplate }) => (
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
            textMessage={workout?.minutes?.toString() || ''}
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
            textMessage={workout.exercises.length.toString()}
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
            textMessage={workout.calories?.toString() + 'k' || ''}
          />
          <CustomText
            fontSize={responsiveFontSize(14)}
            color={colors.textSecondary}
            textMessage="Calories"
          />
        </View>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Workout Types" />
      <View style={styles.searchContainer}>
        <TextInput
          value={searchTerm}
          onChangeText={handleSearchChange}
          placeholder="Search workouts..."
          placeholderTextColor={colors.textSecondary}
          style={styles.searchInput}
        />
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlashList
          data={filteredTypes}
          renderItem={renderWorkoutCard}
          keyExtractor={keyExtractor}
          estimatedItemSize={150}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartWorkout}>
              <CustomText
                fontSize={responsiveFontSize(18)}
                color={colors.textInverse}
                textMessage="Start New Workout"
              />
            </TouchableOpacity>
          }
        />
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
  listContentContainer: {
    paddingHorizontal: windowWidth * 0.04,
    paddingBottom: windowHeight * 0.02,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: windowWidth * 0.04,
    paddingTop: windowHeight * 0.01,
    paddingBottom: windowHeight * 0.015,
  },

  searchInput: {
    backgroundColor: colors.background,
    borderRadius: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.04,
    paddingVertical: windowHeight * 0.015,
    fontSize: responsiveFontSize(16),
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border || '#ccc',
  },
  workoutCard: {
    backgroundColor: colors.background,
    borderRadius: windowWidth * 0.04,
    padding: windowWidth * 0.04,
    marginBottom: windowHeight * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: windowWidth * 0.01,
    borderLeftColor: colors.primary,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: windowHeight * 0.02,
  },
  syncedChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
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
});
