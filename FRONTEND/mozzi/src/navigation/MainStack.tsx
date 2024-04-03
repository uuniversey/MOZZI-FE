import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import MainScreen from '../screens/main/MainScreen'
import RecapScreen from '../screens/main/RecapScreen'
import MakeShortsScreen from '../screens/main/MakeShortsScreen'
import SearchScreen from '../screens/search/SearchScreen'
import RecapLandingScreen from '../screens/main/RecapLandingScreen'
import SelectShortsImageScreen from '../screens/main/SelectShortsImageScreen'
import RecipeScreen from '../screens/recipe/RecipeScreen'
import EventRecommendScreen from '../screens/recommend/EventRecommendScreen'

export type TypecreateNativeStackNavigatorParams = {
  Main: undefined
  Recap: undefined
  MakeShorts: undefined
  Search: undefined
  RecapLanding: undefined
  SelectShortsImage: undefined
}

const Stack = createStackNavigator<TypecreateNativeStackNavigatorParams>()


function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Recap" component={RecapScreen} />
      <Stack.Screen name="MakeShorts" component={MakeShortsScreen} />
      <Stack.Screen name="SelectShortsImage" component={SelectShortsImageScreen} />
      <Stack.Screen name="RecapLanding" component={RecapLandingScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="Event" component={EventRecommendScreen} />
    </Stack.Navigator>
  )
}

export default MainStack
