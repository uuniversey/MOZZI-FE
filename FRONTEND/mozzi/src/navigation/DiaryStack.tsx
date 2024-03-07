import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DiaryScreen from '../screens/diary/DiaryScreen'
import DiaryDetailScreen from '../screens/diary/DiaryDetailScreen'
import DiaryCreateScreen from '../screens/diary/DiaryCreateScreen'
import DiaryCreateSelectScreen from '../screens/diary/DiaryCreateSelectScreen'

const Stack = createNativeStackNavigator()

function DiaryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Diary" component={DiaryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DiaryCreate" component={DiaryCreateScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DiaryCreateSelect" component={DiaryCreateSelectScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default DiaryStack
