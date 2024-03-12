import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DiaryScreen from '../screens/diary/DiaryScreen'
import DiaryDetailScreen from '../screens/diary/DiaryDetailScreen'
import DiaryCreateScreen from '../screens/diary/DiaryCreateScreen'
import DiaryCreateSelectScreen from '../screens/diary/DiaryCreateSelectScreen'

const Stack = createNativeStackNavigator()

function DiaryStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="Diary" component={DiaryScreen} />
      <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
      <Stack.Screen name="DiaryCreate" component={DiaryCreateScreen} />
      <Stack.Screen name="DiaryCreateSelect" component={DiaryCreateSelectScreen} />
    </Stack.Navigator>
  )
}

export default DiaryStack
