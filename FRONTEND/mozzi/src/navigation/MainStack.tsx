import React from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import MainScreen from '../screens/main/MainScreen'
import RecapScreen from '../screens/main/RecapScreen'
import MakeShortsScreen from '../screens/main/MakeShortsScreen'
import SearchScreen from '../screens/search/SearchScreen'
import RecapLandingScreen from '../screens/main/RecapLandingScreen'

export type TypecreateNativeStackNavigatorParams = {
  Main: undefined
  Recap: undefined
  MakeShorts: undefined
  Search: undefined
  RecapLanding: undefined
};

const Stack = createNativeStackNavigator<TypecreateNativeStackNavigatorParams>()


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
      <Stack.Screen name="RecapLanding" component={RecapLandingScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  )
}

export default MainStack
