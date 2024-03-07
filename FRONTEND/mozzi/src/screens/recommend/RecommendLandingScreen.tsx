import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

function RecommendLandingScreen () {
  
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
        <Text>주사위 그림 주사위 그림 주사위 그림 주사위 그림</Text>
        <Text>아우엉님의 레시피를 찾고 있어요</Text>
      </View>
    </>
  )
}

RecommendLandingScreen.options = {
  tabBarVisible: false, // 하단 탭 바 숨김
}

export default RecommendLandingScreen