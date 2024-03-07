
import React from 'react'

import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
        <Tap.Navigator
          screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              height: 75,
            },
            tabBarIcon: ({ focused, size, color }) => {
              let iconName
              if (route.name === 'MainTab') {
                iconName = focused ? 'home' : 'home-outline'
              } else if (route.name === 'FridgeTab') {
                iconName = focused ? 'fridge' : 'fridge-outline'
              } else if (route.name === 'RecommendTab') {
                iconName = focused
                  ? 'dice-multiple'
                  : 'dice-multiple-outline'
              } else if (route.name === ' DiaryTab') {
                iconName = focused
                  ? 'calendar-month'
                  : 'calendar-month-outline'
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline'
              }

              return <MaterialIcons name={iconName} size={size} color={color} />
            }
          })}
        >
        {/* <Tap.Navigator tabBar={(props) => <AppNavigator {...props} />}> */}
          <Tap.Screen name="MainTab" component={MainStack} />
          <Tap.Screen name="FridgeTab" component={FridgeStack} />
          <Tap.Screen name="RecommendTab" component={RecommendStack} />
          <Tap.Screen name='DiaryTab' component={DiaryStack} />
          <Tap.Screen name="ProfileTab" component={ProfileScreen} />
        </Tap.Navigator>
      </NavigationContainer>
      : 
      <LandingScreen />
      }
    </>
  )
}

export default App
