import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import FridgeScreen from '../screens/fridge/FridgeScreen'
import FridgeDetailScreen from '../screens/fridge/FridgeDetailScreen'

const Stack = createStackNavigator()

function FridgeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Fridge" component={FridgeScreen} />
      <Stack.Screen name="FridgeDetail" component={FridgeDetailScreen} />
    </Stack.Navigator>
  )
}

export default FridgeStack