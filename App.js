import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import 'react-native-gesture-handler'; 
import {LogBox } from 'react-native'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
LogBox.ignoreAllLogs()
const App = () => {
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
    <NavigationContainer>
    <ApplicationProvider {...eva} theme={eva.light}>
      <StackNavigator />
      </ApplicationProvider>
    </NavigationContainer>
      </BottomSheetModalProvider>
    </Provider>
  );
};
export default App;
