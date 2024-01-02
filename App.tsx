/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import Setup from './Setup';
import { AppProvider } from './src/context/AppContext';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppProvider>
        <Setup />
      </AppProvider>
    </SafeAreaView>
  );
}

export default App;
