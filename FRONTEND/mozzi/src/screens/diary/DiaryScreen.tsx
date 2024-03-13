import { View, Text, Button } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

import { Calendar } from 'react-native-calendars'

function DiaryScreen () {

  const navigation = useNavigation()

  const moveDiaryDetail = () => {
    navigation.navigate("DiaryDetail")
  }
  const moveDiaryCreate = () => {
    navigation.navigate("DiaryCreate")
  }

  return (
    <>
    <Calendar />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>다이어리</Text>
        <Button title="Go to Detail" onPress={moveDiaryDetail} />
        <Button title="글 작성" onPress={moveDiaryCreate} />
      </View>
    </>
  )
}

export default DiaryScreen