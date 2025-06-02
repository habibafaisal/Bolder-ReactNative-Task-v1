import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import WorkoutHistory from '../screens/WorkoutHistory/WorkoutHistory';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect } from 'react';
import { seedMockWorkouts } from '../services/sync/mockData';
import { ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
const Stack = createStackNavigator();

function AppStack() {
  const workouts = useSelector((state: RootState) => state?.workouts);
  const bootstrapped = useSelector((state: RootState) => state._persist?.rehydrated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (bootstrapped && (!workouts?.sessions || workouts.sessions.length === 0)) {
      seedMockWorkouts(dispatch);
    }
  }, [bootstrapped]);

  if (!bootstrapped) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{
          headerShown: false,
          // gestureDirection: 'vertical',
        }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        {/* <Stack.Screen name="WorkoutHistory" component={WorkoutHistory} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
