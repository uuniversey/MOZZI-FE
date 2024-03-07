import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

function RecipeScreen () {

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
        <Text>레시피 이름</Text>
        <Text>레시피 순서</Text>
        <Text>레시피 사진</Text>
        <Text>레시피 설명</Text>
      </View>
    </>

  )
}

export default RecipeScreen