
import React from 'react'

import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import AppNavigator from './src/navigation/AppNavigator'

import MainStack from './src/navigation/MainStack'
import FridgeStack from './src/navigation/FridgeStack'
import RecommendStack from './src/navigation/RecommendStack'
import DiaryStack from './src/navigation/DiaryStack'
import ProfileScreen from './src/screens/profile/ProfileScreen'

import LandingScreen from './src/screens/landing/LandingScreen'

const Tap = createBottomTabNavigator()

function App() {
  
  const isLogin : boolean = true

  return (
    <>
      {isLogin ? 
      <NavigationContainer>
        <Tap.Navigator>
        {/* <Tap.Navigator tabBar={(props) => <AppNavigator {...props} />}> */}
          <Tap.Screen name="MainTap" component={MainStack} options={{ headerShown: false }} />
          <Tap.Screen name="FridgeTap" component={FridgeStack} options={{ headerShown: false }} />
          <Tap.Screen name="RecommendTap" component={RecommendStack} options={{ headerShown: false }} />
          <Tap.Screen name='DiaryTap' component={DiaryStack} options={{ headerShown: false }} />
          <Tap.Screen name="ProfileTap" component={ProfileScreen} options={{ headerShown: false }} />
        </Tap.Navigator>
      </NavigationContainer>
      : 
      <LandingScreen />
      }
    </>
  )
}

export default App
