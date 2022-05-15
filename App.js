import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from './src/screens/MainScreen';
import { ArScreen } from './src/screens/ArScreen';
const Root = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Root.Navigator initialRouteName="Home">
        <Root.Screen name="Home" component={MainScreen} />
        <Root.Screen name="AR" component={ArScreen} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default App;
