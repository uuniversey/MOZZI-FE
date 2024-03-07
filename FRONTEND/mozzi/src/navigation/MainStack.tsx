import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainScreen from '../screens/main/MainScreen'
import RecapScreen from '../screens/main/RecapScreen'
import MakeShortsScreen from '../screens/main/MakeShortsScreen'
import SearchScreen from '../screens/search/SearchScreen'

const Stack = createNativeStackNavigator()

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Recap" component={RecapScreen} />
      <Stack.Screen name="MakeShorts" component={MakeShortsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  )
}

export default MainStack