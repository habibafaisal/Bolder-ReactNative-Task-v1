import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import WorkoutHistory from '../screens/WorkoutHistory/WorkoutHistory';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {useEffect} from 'react';
import {seedMockWorkouts} from '../services/mockData';
import {loadWorkoutsFromStorage} from '../store/slices/workoutsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

function AppStack() {
  const workouts = useSelector((state: RootState) => state.workouts);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (workouts.sessions.length === 0) {
      seedMockWorkouts(dispatch);
    }
  }, []);

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
