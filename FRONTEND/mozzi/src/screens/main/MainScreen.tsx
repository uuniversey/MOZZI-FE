import { View, Text, Button } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

function MainScreen() {
  const navigation = useNavigation()

  const moveSearch = () => {
    navigation.navigate("Search")
  }

  const moveRecap = () => {
    navigation.navigate("Recap")
  }
  
  return (
    <>
      <View>
        <Button title="검색 아이콘" onPress={moveSearch} />
        <Text>환영해요 아우엉님! 오늘은 어떤 레시피를 도전할까요?</Text>
        <Button title="나의 모찌 기록" onPress={moveRecap} />
      </View>
    </>
  )
}

export default MainScreen