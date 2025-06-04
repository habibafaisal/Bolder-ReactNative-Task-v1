import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutSession from '../screens/WorkoutSession/WorkoutSession';
import WorkoutHistory from '../screens/WorkoutHistory/WorkoutHistory';
import Workout from '../screens/WorkoutPlanner/Workout';
import WorkoutDetail from '../screens/WorkoutPlanner/WorkoutDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  const WorkoutComponent = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Workout" component={Workout} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
      </Stack.Navigator>
    );
  };
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="WorkoutSession"
        component={WorkoutSession}

        options={{
          tabBarLabel: 'Session',
          tabBarIcon: ({ color, size }) => null,
        }}
      />
      <Tab.Screen
        name="WorkoutHistory"
        component={WorkoutHistory}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => null,
        }}
      />
      <Tab.Screen
        name="WorkoutPlanner"
        component={WorkoutComponent}
        options={{
          tabBarLabel: 'Workouts',
          tabBarIcon: ({ color, size }) => null,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
