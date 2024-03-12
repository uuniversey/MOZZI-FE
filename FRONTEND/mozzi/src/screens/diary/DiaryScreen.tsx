import { View, Text, Button } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>DiaryScreen</Text>
        <Button title="Go to Detail" onPress={moveDiaryDetail} />
        <Button title="글 작성" onPress={moveDiaryCreate} />
      </View>
    </>
  )
}

export default DiaryScreen