import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RecommendScreen from '../screens/recommend/RecommendScreen'
import RecipeScreen from '../screens/recipe/RecipeScreen'
import RecommendLandingScreen from '../screens/recommend/RecommendLandingScreen'
import WorldcupScreen from '../screens/recommend/WorldcupScreen'

const Stack = createNativeStackNavigator()

function RecommendStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    > 
      <Stack.Screen name="Worldcup" component={WorldcupScreen} />
      <Stack.Screen name="Recommend" component={RecommendScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="RecommendLanding" component={RecommendLandingScreen} />
    </Stack.Navigator>
  )
}

export default RecommendStack