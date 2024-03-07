import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

function DiaryCreateScreen () {
  
  const navigation = useNavigation()

  const moveDiaryCreateSelect = () => {
    navigation.navigate("DiaryCreateSelect")
  }

  const goBack = () => {
   navigation.goBack()
  }
  
  return (
    <>
      <TouchableOpacity onPress={goBack}>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>글 작성</Text>
        <Button title="레시피 불러오기" onPress={moveDiaryCreateSelect} />
      </View>
    </>
  )
}

export default DiaryCreateScreen