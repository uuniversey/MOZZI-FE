import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainScreen from '../screens/main/MainScreen'
import RecapScreen from '../screens/main/RecapScreen'
import MakeShortsScreen from '../screens/main/MakeShortsScreen'
import SearchScreen from '../screens/search/SearchScreen'

const Stack = createNativeStackNavigator()

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Recap" component={RecapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MakeShorts" component={MakeShortsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default MainStack