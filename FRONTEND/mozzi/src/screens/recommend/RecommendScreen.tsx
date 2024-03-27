import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import RecommendItemScreen from './RecommendItemScreen'
import axios from 'axios'
import RecommendLandingScreen from './RecommendLandingScreen';
import { nextDay } from 'date-fns';

import useRecipeStore from '../../store/RecipeStore'

type Recipe = {
  recipeId: number
  dishName: string
  imageUri: string
};

function RecommendScreen () {

  const navigation = useNavigation()
  const { getRecipeDetail } = useRecipeStore()

  const moveRecipe = () => {
    getRecipeDetail(todayRecipe.dishName)
    navigation.navigate("Recipe")
  }

  const moveRecommendLanding = async () => {
    setLoading(true) // 로딩 시작
    // navigation.navigate("RecommendLanding"); // RecommendLanding 페이지로 네비게이션
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * dummyRecipe.length);
    } while (newIndex === index);

    setIndex(newIndex)
  
    // 여기에 레시피 로딩을 위한 비동기 로직 추가 (예: setTimeout 사용)
    setTimeout(() => {
      // navigation.navigate("Recipe", { nextIndex: index + 1 }); // Recipe 페이지로 이동
      setLoading(false) // 로딩 완료
    }, 3000) // 2초 후 로딩 완료 및 페이지 이동 (실제 API 요청 시에는 요청 완료 시점에 설정)
  };

  const handleSharePress = () => {
    console.log('Share button pressed')
  }

  const handleRetryPress = () => {
    console.log('Retry button pressed')
  }

  const dummyRecipe = [{
    recipeId: 1,
    dishName: "부추 콩가루 찜",
    imageUri: "https://i.namu.wiki/i/QncptNs6gl_Zyh-LEPsb_pEOkFhYKjvlOHUm0yNGp9iwCRUmUVjdJT9uxEEHIH6I0YW8BMq2YnvDlSV10wI3apuzbl_hDUpgH8KYCNFUqRc-E2s4JqnsVwWMqdHt26Kqsw3O4qSK9NLlvdjzOnk1Xw.webp"
  },
  {
    recipeId: 2,
    dishName: "부추 콩가루 찜",
    imageUri: "https://i.namu.wiki/i/870lvjrMKGTyx00arSIaji0nFXyrxh7C-8uMe4WA0k9mhlJUOnkRFz4r4w5411--p2I4Vl1TmDHjEWOJ5xpUladA9gGNBWJmJDR2kHavjNUGh6K3HVSbygWa3GsUMbjr0M755QOGtqS5Pc7M3LpXSg.webp"
  },
  {
    recipeId: 3,
    dishName: "부추 콩가루 찜",
    imageUri: "https://i.namu.wiki/i/ywRdkOZAdp4dU3ItrNm36NjVx3sbEE6PYVvNVYpRa9MUDtKIxxejpM-jAXGl9fHGavoYESWtzbf7C0LA9RBGsS63D8KY1eINfE4ZQf-36gNq-fDtiJu9fXkS5hE01eY2ArhJcagnO7pMdtRz2e0dsA.webp"
  },
  {
    recipeId: 4,
    dishName: "부추 콩가루 찜",
    imageUri: "https://i.namu.wiki/i/0e2H0MymA2D0hthFVdH0MpUTxcVHLuAMaVv7mpWlyMHzxsFIaDkN1VRfX_nLLTlUde0t3sq97DIfteY0XrucKC7BnO4X4xtAVbC5O1TKYG0XTUXlOVMnbM7LdoBCiGkXqPT6qE1RuaaKqsrj5ojweQ.webp"
  },
  ]

  const [todayRecipe, setTodayRecipe] = useState<Recipe | null>(null)
  const [index, setIndex] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  
  const date: string = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', // "2024년"
    month: 'long', // "3월"
    day: 'numeric', // "19일"
  })

  // const todayRecommend =  async (userId: string, index: number) => {
  //   try {
  //     console.log(userId, index)
  //     const response = await axios.get(`http://10.0.2.2:8000/maker/video_yk/?user_id=${userId}&index=${index}`)
  //     console.log(response)
  //     // useVideoStore.getState().setVideoComplete(true)
  //     setTodayRecipe(response.data)
  //   } catch (error) {
  //     //응답 실패
  //     console.error(error);
  //   }
  // }

 

  const todayRecommend = (recipeIndex: number) => {
    // dummyRecipe 배열에서 recipeIndex에 해당하는 레시피를 찾아 설정합니다.
    // 배열 인덱스가 0부터 시작하므로 recipeIndex 값을 조정합니다.
    const recipe = dummyRecipe[recipeIndex]
    if (recipe) {
      setTodayRecipe(recipe);
    }
  }

  useEffect(() => {
    // todayRecommend('baloo', 1)
    console.log(index)
    todayRecommend(index)

    return () => {
    // setLoading(false)  
    // setIndex(1)
    }

  }, [index])

  if (!todayRecipe) {
    return null
  }

  if (loading) {
    return <RecommendLandingScreen />
  }

  return (
    <RecommendItemScreen
      date={date}
      question="오늘의 추천 메뉴는?" // 아침?, 점심?, 저녁?
      dishName={todayRecipe?.dishName} // 글자수가 긴 거에 대한 라인 수정 필요할 듯
      imageUri={todayRecipe?.imageUri}
      onSharePress={moveRecipe}
      onRetryPress={moveRecommendLanding}
    />
  )
}

export default RecommendScreen