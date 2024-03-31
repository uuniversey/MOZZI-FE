import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import UserScreen from '../screens/profile/UserScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'
import WithdrawalScreen from '../screens/profile/WithdrawalScreen'
import PolicyScreen from '../screens/profile/PrivacyScreen'
import PrivacyScreen from '../screens/profile/PrivacyScreen'
import TermsOfUseScreen from '../screens/profile/TermsOfUseScreen'
import PolicyMenuScreen from '../screens/profile/PolicyMenuScreen'


const Stack = createStackNavigator()

function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
      <Stack.Screen name="PolicyMenu" component={PolicyMenuScreen} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  )
}

export default UserStack
