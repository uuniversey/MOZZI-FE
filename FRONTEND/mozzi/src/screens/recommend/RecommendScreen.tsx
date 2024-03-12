import { View, Text, Button } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import RecommendItemScreen from './RecommendItemScreen'

function RecommendScreen () {

  const navigation = useNavigation()

  const moveRecipe = () => {
    navigation.navigate("Recipe")
  }

  const moveRecommendLanding = () => {
    navigation.navigate("RecommendLanding")
  }

  const handleSharePress = () => {
    console.log('Share button pressed');
  };

  const handleRetryPress = () => {
    console.log('Retry button pressed');
  };

  return (
    <>
      <RecommendItemScreen
        date="2024년 3월 5일,"
        question="오늘의 저녁 메뉴는?"
        dishName="라자냐"
        imageUri="https://via.placeholder.com/200" // Replace with your image URL
        onSharePress={moveRecipe}
        onRetryPress={moveRecommendLanding}
      />
    </>
  )
}

export default RecommendScreen