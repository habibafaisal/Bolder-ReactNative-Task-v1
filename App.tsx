import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaView, Text, View} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <View>
            <Text>Workout Logger</Text>
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
