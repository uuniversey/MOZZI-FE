import { View, Text, Button } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

function RecommendScreen () {

  const navigation = useNavigation()

  const moveRecipe = () => {
    navigation.navigate("Recipe")
  }

  const moveRecommendLanding = () => {
    navigation.navigate("RecommendLanding")
  }

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>2024년 몇월 몇일 오늘의 저녁 메뉴는?</Text>
        <Button title="레시피 보러가기" onPress={moveRecipe} />
        <Button title="다시 추천 받기" onPress={moveRecommendLanding} />
      </View>
    </>
  )
}

export default RecommendScreen