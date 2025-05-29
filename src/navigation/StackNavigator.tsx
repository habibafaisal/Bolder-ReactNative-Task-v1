import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      //   initialRouteName={isLoggedIn ? 'BottomTabs' : 'Welcome'}
      screenOptions={{
        headerShown: false,
        gestureDirection: 'vertical',
      }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}

export default AppStack;
