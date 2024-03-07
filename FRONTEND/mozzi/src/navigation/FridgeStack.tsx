import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import FridgeScreen from '../screens/fridge/FridgeScreen'
import FridgeDetailScreen from '../screens/fridge/FridgeDetailScreen'

const Stack = createNativeStackNavigator()

function FridgeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Fridge" component={FridgeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FridgeDetail" component={FridgeDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default FridgeStack