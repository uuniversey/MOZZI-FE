import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LandingScreen from '../screens/landing/LandingScreen'
import LandingInputScreen from '../screens/landing/LandingInputScreen'
import TestLogin from '../screens/landing/TestLogin'

const Stack = createNativeStackNavigator()

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="TestLogin" component={TestLogin} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="LandingInput" component={LandingInputScreen} />
      {/* <Stack.Screen name="TestLogin" component={TestLogin} /> */}
    </Stack.Navigator>
  )
}

export default LoginStack