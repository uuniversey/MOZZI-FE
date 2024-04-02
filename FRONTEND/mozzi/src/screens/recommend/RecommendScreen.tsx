import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import RecommendItemScreen from './RecommendItemScreen'
import axios from 'axios'
import RecommendLandingScreen from './RecommendLandingScreen';
import { nextDay } from 'date-fns';

import useRecipeStore from '../../store/RecipeStore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

type Recipe = [{
  // recipeId: number
  foodName: string[]
  photo: string[]
}]

function RecommendScreen () {

  const navigation = useNavigation()
  const { getRecipeDetail } = useRecipeStore()

  const moveRecipe = () => {
    getRecipeDetail(todayRecipe.foodName)
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


  const [todayRecommendRecipe, setTodayRecommendRecipe] = useState([])
  
  const [todayRecipe, setTodayRecipe] = useState<Recipe | null>(null)
  const [index, setIndex] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  
  const date: string = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', // "2024년"
    month: 'long', // "3월"
    day: 'numeric', // "19일"
  })

  const recommendRecipe = async () => {
    const token = await AsyncStorage.getItem('accessToken')
    try {
      const response = await axios.get(`https://a304.site/api/recommend/datas/get_recommendation/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      })
      console.log(response.data.foods)
      // const data = await response.data.foods
      setTodayRecommendRecipe(response.data.foods)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    recommendRecipe()
    return () => {
    }
  }, [index])
  
  useEffect(() => {
    const todayRecommend = (recipeIndex: number) => {
      // Check that todayRecommendRecipe has data and the desired index exists
      if (todayRecommendRecipe.length > 0 && todayRecommendRecipe[0].foodName.length > recipeIndex) {
        const recipe = {
          foodName: todayRecommendRecipe[0].foodName[recipeIndex],
          photo: todayRecommendRecipe[0].photo[recipeIndex]
        }
        setTodayRecipe(recipe)
      }
    }
    todayRecommend(index)
  }, [todayRecommendRecipe, index])

  // const todayRecommend = (recipeIndex: number) => {
  //   // dummyRecipe 배열에서 recipeIndex에 해당하는 레시피를 찾아 설정합니다.
  //   // 배열 인덱스가 0부터 시작하므로 recipeIndex 값을 조정합니다.
  //   const recipe = dummyRecipe[recipeIndex]
  //   if (recipe) {
  //     setTodayRecipe(recipe);
  //   }
  // }

  // const todayRecommend = (recipeIndex: number) => {
  //   // Check that todayRecommendRecipe has data and the desired index exists
  //   console.log('값이 들어왔나 볼까~~~~~~~~~~', todayRecommendRecipe)
  //   if (todayRecommendRecipe.length > 0 && todayRecommendRecipe[0].foodName.length > recipeIndex) {
  //     const recipe = {
  //       foodName: todayRecommendRecipe[0].foodName[recipeIndex],
  //       photo: todayRecommendRecipe[0].photo[recipeIndex]
  //     }
  //     setTodayRecipe(recipe)
  //   }
  // }

  // useEffect(() => {
  //   // todayRecommend('baloo', 1)
  //   console.log(index)
    

  //   return () => {
  //   // setLoading(false)  
  //   // setIndex(1)
  //   }

  // }, [index])

  // if (!todayRecipe) {
  //   return null
  // }

  if (loading) {
    return <RecommendLandingScreen />
  }

  return (
    <RecommendItemScreen
      date={date}
      question="오늘의 추천 메뉴는?" // 아침?, 점심?, 저녁?
      dishName={todayRecipe?.foodName} // 글자수가 긴 거에 대한 라인 수정 필요할 듯
      imageUri={todayRecipe?.photo}
      onSharePress={moveRecipe}
      onRetryPress={moveRecommendLanding}
    />
  )
}

export default RecommendScreen