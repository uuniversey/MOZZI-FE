import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import RecommendScreen from '../screens/recommend/RecommendScreen'
import RecipeScreen from '../screens/recipe/RecipeScreen'
import RecommendLandingScreen from '../screens/recommend/RecommendLandingScreen'
import WorldcupScreen from '../screens/recommend/WorldcupScreen'

const Stack = createStackNavigator()

function RecommendStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Worldcup" component={WorldcupScreen} />
      <Stack.Screen name="Recommend" component={RecommendScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="RecommendLanding" component={RecommendLandingScreen} />
    </Stack.Navigator>
  )
}

export default RecommendStack