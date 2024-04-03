import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import RecommendItemScreen from './RecommendItemScreen'
import RecommendLandingScreen from './RecommendLandingScreen'

import useRecipeStore from '../../store/RecipeStore'


function RecommendScreen () {

  const navigation = useNavigation()
  const { getRecipeDetail, recipeDetailData } = useRecipeStore()
  
  const [todayRecipe, setTodayRecipe] = useState(null)
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('굿')
  }, [recipeDetailData])

  const moveRecipe = () => {
    getRecipeDetail(recipeDetailData.foodName)
    navigation.navigate("Recipe")
  }

  const moveRecommendLanding = async () => {
    setLoading(true) // 로딩 시작
    // navigation.navigate("RecommendLanding"); // RecommendLanding 페이지로 네비게이션
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * 10);
    } while (newIndex === index);

    setIndex(newIndex)
  
    // 여기에 레시피 로딩을 위한 비동기 로직 추가 (예: setTimeout 사용)
    setTimeout(() => {
      // navigation.navigate("Recipe", { nextIndex: index + 1 }); // Recipe 페이지로 이동
      setLoading(false) // 로딩 완료
    }, 3000) // 2초 후 로딩 완료 및 페이지 이동 (실제 API 요청 시에는 요청 완료 시점에 설정)
  }

  const date: string = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', // "2024년"
    month: 'long', // "3월"
    day: 'numeric', // "19일"
  })

  if (loading) {
    return <RecommendLandingScreen />
  }

  return (
    <RecommendItemScreen
      date={date}
      question="오늘의 추천 메뉴는?"
      dishName={recipeDetailData?.foodName} 
      imageUri={recipeDetailData?.photo}
      onSharePress={moveRecipe}
      onRetryPress={moveRecommendLanding}
    />
  )
}

export default RecommendScreen