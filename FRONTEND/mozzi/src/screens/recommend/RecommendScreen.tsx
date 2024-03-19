import React from 'react'
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
    console.log('Share button pressed')
  }

  const handleRetryPress = () => {
    console.log('Retry button pressed')
  }

  return (
    <>
      <RecommendItemScreen
        date="2024년 3월 5일,"
        question="오늘의 저녁 메뉴는?"
        dishName="라자냐"
        imageUri="https://via.placeholder.com/200"
        onSharePress={moveRecipe}
        onRetryPress={moveRecommendLanding}
      />
    </>
  )
}

export default RecommendScreen