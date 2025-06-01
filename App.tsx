import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import {persistor, RootState, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaView, Text, View} from 'react-native';
import AppStack from './src/navigation/StackNavigator';

const App = () => {
  const LoadingScreen = () => <Text>Loading...</Text>;

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <AppStack />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
