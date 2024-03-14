import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LandingScreen from '../screens/landing/LandingScreen'
import LandingInputScreen from '../screens/landing/LandingInputScreen'

const Stack = createNativeStackNavigator()

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="LandingInput" component={LandingInputScreen} />
    </Stack.Navigator>
  )
}

export default LoginStack