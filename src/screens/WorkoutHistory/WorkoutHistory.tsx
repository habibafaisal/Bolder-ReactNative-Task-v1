import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import ScreenHeader from '../../components/common/ScreenHeader';
import { FlashList } from '@shopify/flash-list';
import { colors } from '../../constants/colors';
import CustomText from '../../components/common/CustomText';
import Button from '../../components/common/Button';
import { responsiveFontSize, windowHeight } from '../../constants/sizes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { WorkoutSession } from '../../store/types/types';

const WorkoutHistory: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const sessions = useSelector((state: RootState) => state.workouts.sessions);
  const isOnline = useSelector((state: RootState) => state.offline?.online);
  const { syncing, lastSyncFailed } = useSelector(
    (state: RootState) => state.workouts,
  );
  console.log('sessions ss', sessions, { syncing, lastSyncFailed });
  // useEffect(() => {
  //   fetch();
  // }, []);
  // const fetch = async () => {
  //   const stored = await AsyncStorage.getItem('@workouts');
  //   console.log('stored', stored);
  //   await dispatch(loadWorkoutsFromStorage());
  // };

  const keyExtractor = useCallback(
    (item: any, i: number) => `${i}-${item.id}`,
    [],
  );
  const renderWorkoutItem = ({ item }: { item: WorkoutSession }) => (
    <View style={styles.workoutCard}>
      <View style={styles.workoutHeader}>
        <CustomText
          fontSize={responsiveFontSize(17)}
          color={colors.textPrimary}
          textMessage={new Date(item.date).toLocaleString()}
        />
        <View style={styles.durationChip}>
          <CustomText
            fontSize={responsiveFontSize(13)}
            color={colors.textInverse}
            textMessage={`${item.exercises.length} sec(s)`}
          />
        </View>
        <View
          style={[
            styles.statusChip,
            {
              backgroundColor: item.synced ? colors.success : colors.pending,
            },
          ]}>
          <CustomText
            fontSize={responsiveFontSize(13)}
            color={colors.textInverse}
            textMessage={item.synced ? 'Completed' : 'Pending'}
          />
        </View>
      </View>
      <View style={styles.exercisesList}>
        {item.exercises.map((exercise, index) => (
          <View
            key={index}
            style={[
              styles.exerciseItem,
              index === item.exercises.length - 1 && styles.noBorder,
            ]}>
            <CustomText
              fontSize={responsiveFontSize(14)}
              color={colors.textPrimary}
              textMessage={exercise.name}
            />
            <CustomText
              fontSize={responsiveFontSize(12)}
              color={colors.textSecondary}
              textMessage={`${exercise.sets} sets × ${exercise.reps} reps`}
            />
          </View>
        ))}
      </View>
    </View>
  );
  const EmptyList = () => {
    return (
      <View style={styles.emptyState}>
        <CustomText
          fontSize={responsiveFontSize(20)}
          textMessage="No workouts recorded yet!"
          color={colors.textSecondary}
          align="center"
        />
        <CustomText
          fontSize={responsiveFontSize(15)}
          textMessage="Start your first workout to see your progress here."
          color={colors.textSecondary}
          align="center"
        />
        <Button
          btnLabel="Log New Workout"
          buttonBackgroundColor={colors.secondary}
          buttonTextColor={colors.textInverse}
          width={200}
          radius={10}
          onPress={() => console.log('Navigate to new workout screen')}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Workout History"
        rightButton={{
          label: 'Filter',
          onPress: () => console.log('Filter pressed'),
        }}
      />
      <View style={styles.networkStatusContainer}>
        <CustomText
          fontSize={responsiveFontSize(13)}
          textMessage={isOnline ? 'You are Online' : 'You are Offline'}
          color={isOnline ? colors.success : colors.pending}
          align="center"
        />
      </View>

      {/* {lastSyncFailed ? (
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Last Sync failed. Will retry when online.
        </Text>
      ) : (
        <Text style={{ color: 'green', textAlign: 'center' }}>
          Last Sync Success.
        </Text>
      )} */}
      {syncing && <ActivityIndicator />}
      <FlashList
        data={sessions}
        extraData={sessions}
        renderItem={renderWorkoutItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={300}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <CustomText
              fontSize={responsiveFontSize(20)}
              textMessage="No workouts recorded yet!"
              color={colors.textSecondary}
              align="center"
            />
            <CustomText
              fontSize={responsiveFontSize(15)}
              textMessage="Start your first workout to see your progress here."
              color={colors.textSecondary}
              align="center"
            />
            <Button
              btnLabel="Log New Workout"
              buttonBackgroundColor={colors.secondary}
              buttonTextColor={colors.textInverse}
              width={200}
              radius={10}
              onPress={() => console.log('Navigate to new workout screen')}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  networkStatusContainer: {
    marginVertical: windowHeight * 0.02,
  },
  listContentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  workoutCard: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: colors.shadowLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  durationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  exercisesList: {},
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: windowHeight * 0.15,
    backgroundColor: colors.backgroundLight,
  },
});

export default WorkoutHistory;
