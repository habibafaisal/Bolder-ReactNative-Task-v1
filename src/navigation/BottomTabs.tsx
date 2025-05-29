import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <></>
      {/* <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="WorkoutHistory" component={WorkoutHistory} />
      <Tab.Screen name="WorkoutPlanner" component={WorkoutPlanner} /> */}
    </Tab.Navigator>
  );
}

export default BottomTabs;
