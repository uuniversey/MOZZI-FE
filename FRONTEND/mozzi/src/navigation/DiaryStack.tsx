import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import DiaryScreen from '../screens/diary/DiaryScreen'
import DiaryDetailScreen from '../screens/diary/DiaryDetailScreen'
import DiaryCreateScreen from '../screens/diary/DiaryCreateScreen'
import DiaryCreateSelectScreen from '../screens/diary/DiaryCreateSelectScreen'
import Stamp from '../screens/diary/StampScreen'

type RootStackParamList = {
  Diary: undefined; // 파라미터가 없는 경우
  DiaryDetail: { date: Date };
  DiaryCreate: undefined;
  DiaryCreateSelect: undefined;
}

const Stack = createStackNavigator<RootStackParamList>()

function DiaryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Diary" component={DiaryScreen} />
      <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
      <Stack.Screen name="DiaryCreate" component={DiaryCreateScreen} />
      <Stack.Screen name="DiaryCreateSelect" component={DiaryCreateSelectScreen} />
      <Stack.Screen name="Stamp" component={Stamp} />
    </Stack.Navigator>
  )
}

export default DiaryStack
