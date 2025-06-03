// WorkoutDetail.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WorkoutTemplate, workoutTemplates } from '../../services/sync/mockWorkoutTemplates';
import CustomText from '../../components/common/CustomText';
import { RootStackParamList } from '../../navigation/navigation.types';


type WorkoutDetailRouteProp = RouteProp<RootStackParamList, 'WorkoutDetail'>;


const WorkoutDetail = () => {
    const route = useRoute<WorkoutDetailRouteProp>();
    const { workoutId } = route.params;
    const [workout, setWorkout] = useState<WorkoutTemplate | null>(null);

    useEffect(() => {
        setWorkout(getDataById())
    }, [])

    const getDataById = () => {
        return workoutTemplates.find((workout) => workout.id == workoutId)
    }
    return (
        <ScrollView style={{ padding: 16 }}>
            {
                !workout ?
                    <View>
                        <ActivityIndicator size="large" color="black" />
                    </View> :
                    <View>
                        <CustomText fontSize={24} textMessage={workout?.name} />
                        <CustomText fontSize={16} textMessage={workout?.description || ''} />
                        <CustomText fontSize={18} textMessage={`Duration: ${workout?.minutes} min`} />
                        <CustomText fontSize={18} textMessage={`Calories: ${workout?.calories} cal`} />
                        {workout.exercises.map(ex => (
                            <View key={ex.id} style={{ marginTop: 12 }}>
                                <CustomText textMessage={ex.name} />
                                <CustomText textMessage={`Sets: ${ex.sets}  Reps: ${ex.reps}  Weight: ${ex.weight}`} />
                            </View>
                        ))}
                    </View>
            }
        </ScrollView>
    );
};

export default WorkoutDetail;
