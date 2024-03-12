import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

function RecapScreen () {
  
  const navigation = useNavigation()

  const moveMakeShorts = () => {
    navigation.navigate("MakeShorts")
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
        <Text>나의 모찌 기록</Text>
        <Button title="쇼츠 만들기" onPress={moveMakeShorts} />
      </View>
    </>
  )
}

export default RecapScreen