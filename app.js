import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterBeeScreen from './src/screens/RegisterBeeScreen';
import ChatScreen from './src/screens/Chat';
import ListScreen from './src/screens/List';
import LocationScreen from './src/screens/Location';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegisterBee">
        <Stack.Screen name="RegisterBee" component={RegisterBeeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
