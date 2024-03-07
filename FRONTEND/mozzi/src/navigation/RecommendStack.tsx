import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RecommendScreen from '../screens/recommend/RecommendScreen'
import RecipeScreen from '../screens/recipe/RecipeScreen'
import RecommendLandingScreen from '../screens/recommend/RecommendLandingScreen'

const Stack = createNativeStackNavigator()

function RecommendStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recommend" component={RecommendScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Recipe" component={RecipeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RecommendLanding" component={RecommendLandingScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default RecommendStack