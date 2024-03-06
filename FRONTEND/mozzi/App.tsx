
import React from 'react'

import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from './src/screens/HomeScreen'
import FridgeScreen from './src/screens/FridgeScreen'
import RecommendScreen from './src/screens/RecommendScreen'
import DiaryScreen from './src/screens/DiaryScreen'
import ProfileScreen from './src/screens/ProfileScreen'

import AppNavigator from './src/navigation/AppNavigator'

const Tap = createBottomTabNavigator()

function App() {
  return (
    <NavigationContainer>
      <Tap.Navigator>
      {/* <Tap.Navigator tabBar={(props) => <AppNavigator {...props} />}> */}
        <Tap.Screen name="Home" component={HomeScreen} />
        <Tap.Screen name="Fridge" component={FridgeScreen} />
        <Tap.Screen name="Recommend" component={RecommendScreen} />
        <Tap.Screen name="Diary" component={DiaryScreen} />
        <Tap.Screen name="Profile" component={ProfileScreen} />
      </Tap.Navigator>
    </NavigationContainer>
  )
}

export default App
