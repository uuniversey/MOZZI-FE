import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

function FridgeDetailScreen () {
  
  const navigation = useNavigation()

  const goBack = () => {
   navigation.goBack()
  }
  
  return (
    <>
      <TouchableOpacity onPress={goBack}>
        <Text>냉장고로 돌아가기</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>FridgeDetailScreen</Text>
      </View>
    </>
  )
}

export default FridgeDetailScreen