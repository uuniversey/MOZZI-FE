import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

function DiaryCreateSelectScreen () {

  const navigation = useNavigation() 

  const goBack = () => {
    navigation.goBack()
   }

  return (
    <>
      <TouchableOpacity onPress={goBack}>
          <Text>뒤로가기</Text>
        </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>셀렉트 레시피</Text>
      </View>
    </>
  )
}

export default DiaryCreateSelectScreen