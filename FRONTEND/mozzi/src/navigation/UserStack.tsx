import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import UserScreen from '../screens/profile/UserScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'
import WithdrawalScreen from '../screens/profile/WithdrawalScreen'
import PolicyScreen from '../screens/profile/PolicyScreen'


const Stack = createNativeStackNavigator()

function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
      <Stack.Screen name="Policy" component={PolicyScreen} />

    </Stack.Navigator>
  )
}

export default UserStack
