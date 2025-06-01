import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WorkoutSession from '../screens/WorkoutSession/WorkoutSession';
import WorkoutHistory from '../screens/WorkoutHistory/WorkoutHistory';
import Workout from '../screens/WorkoutPlanner/Workout';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="WorkoutSession"
        component={WorkoutSession}
        options={{
          tabBarLabel: 'Session',
        }}
      />
      <Tab.Screen
        name="WorkoutHistory"
        component={WorkoutHistory}
        options={{
          tabBarLabel: 'History',
        }}
      />
      <Tab.Screen
        name="WorkoutPlanner"
        component={Workout}
        options={{
          tabBarLabel: 'Planner',
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
