/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Login from './Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OfferList from './OfferList';
import OfferDetails from './OfferDetails';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OfferList" component={OfferList} />
        <Stack.Screen name="OfferDetails" component={OfferDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
