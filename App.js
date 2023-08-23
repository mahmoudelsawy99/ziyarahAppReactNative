import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import 'react-native-gesture-handler'; 
import {LogBox } from 'react-native'
LogBox.ignoreAllLogs()
const App = () => {
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
      </BottomSheetModalProvider>
    </Provider>
  );
};
export default App;
