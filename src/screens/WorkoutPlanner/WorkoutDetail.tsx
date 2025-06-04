// WorkoutDetail.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WorkoutTemplate, workoutTemplates } from '../../services/sync/mockWorkoutTemplates';
import CustomText from '../../components/common/CustomText';
import { RootStackParamList } from '../../navigation/navigation.types';


type WorkoutDetailRouteProp = RouteProp<RootStackParamList, 'WorkoutDetail'>;


import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const WorkoutDetail = () => {
    const route = useRoute<WorkoutDetailRouteProp>();
    const { workoutId } = route.params;
    const [workout, setWorkout] = useState<WorkoutTemplate | undefined | null>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundWorkout = workoutTemplates.find((item) => item.id == workoutId);
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
                <CustomText fontSize={18} textMessage="Workout not found." color={colors.error} align="center" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.headerContainer}>
                <CustomText fontSize={28} textMessage={workout.name} color={colors.textPrimary} align="center" />
                {workout.description && (
                    <CustomText fontSize={16} textMessage={workout.description} color={colors.textSecondary} align="center" />
                )}
            </View>

            <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                    <CustomText fontSize={16} textMessage="Duration" color={colors.primary} />
                    <CustomText fontSize={18} textMessage={`${workout.minutes} min`} color={colors.textPrimary} />
                </View>
                <View style={styles.metricItem}>
                    <CustomText fontSize={16} textMessage="Calories" color={colors.primary} />
                    <CustomText fontSize={18} textMessage={`${workout.calories} cal`} color={colors.textPrimary} />
                </View>
            </View>

            <View style={styles.exercisesHeaderContainer}>
                <CustomText fontSize={22} textMessage="Exercises" color={colors.textPrimary} align="center" />
            </View>
            {workout.exercises.map(ex => (
                <View key={ex.id} style={styles.exerciseCard}>
                    <CustomText fontSize={18} textMessage={ex.name} color={colors.exercise} />
                    <View style={styles.exerciseDetailsContainer}>
                        <CustomText fontSize={15} textMessage={`Sets: ${ex.sets}`} color={colors.textSecondary} />
                        <CustomText fontSize={15} textMessage={`Reps: ${ex.reps}`} color={colors.textSecondary} />
                        {ex.weight && <CustomText fontSize={15} textMessage={`Weight: ${ex.weight}`} color={colors.textSecondary} />}
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
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.backgroundLight,
    },
    headerContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start', // Align items to the start for varied text heights
        marginBottom: 32,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: colors.surface,
        borderRadius: 12,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    metricItem: {
        alignItems: 'center',
        paddingHorizontal: 10, // For spacing between metric items
        flex: 1, // Distribute space equally among metric items
    },
    exercisesHeaderContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    exerciseCard: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    exerciseDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 10, // Spacing between exercise name and its details
    },
});

export default WorkoutDetail;
