import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import RecommendItemScreen from './RecommendItemScreen'
import axios from 'axios'

type Recipe = {
  recipeId: number
  dishName: string
  imageUri: string
};

function RecommendScreen () {

  const navigation = useNavigation()

  const moveRecipe = () => {
    navigation.navigate("Recipe")
  }

  const moveRecommendLanding = () => {
    setIndex(prevIndex => prevIndex + 1); // 인덱스 업데이트
    navigation.navigate("RecommendLanding", { nextIndex: index + 1 });
  };

  const handleSharePress = () => {
    console.log('Share button pressed')
  }

  const handleRetryPress = () => {
    console.log('Retry button pressed')
  }

  const [todayRecipe, setTodayRecipe] = useState<Recipe | null>(null)
  const [index, setIndex] = useState<number>(0)
  
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

  const dummyRecipe = [{
    recipeId: 1,
    dishName: "라자냐",
    imageUri: "https://i.namu.wiki/i/QncptNs6gl_Zyh-LEPsb_pEOkFhYKjvlOHUm0yNGp9iwCRUmUVjdJT9uxEEHIH6I0YW8BMq2YnvDlSV10wI3apuzbl_hDUpgH8KYCNFUqRc-E2s4JqnsVwWMqdHt26Kqsw3O4qSK9NLlvdjzOnk1Xw.webp"
  },
  {
    recipeId: 2,
    dishName: "라자댜",
    imageUri: "https://i.namu.wiki/i/QncptNs6gl_Zyh-LEPsb_pEOkFhYKjvlOHUm0yNGp9iwCRUmUVjdJT9uxEEHIH6I0YW8BMq2YnvDlSV10wI3apuzbl_hDUpgH8KYCNFUqRc-E2s4JqnsVwWMqdHt26Kqsw3O4qSK9NLlvdjzOnk1Xw.webp"
  },
  {
    recipeId: 3,
    dishName: "라자랴",
    imageUri: "https://i.namu.wiki/i/QncptNs6gl_Zyh-LEPsb_pEOkFhYKjvlOHUm0yNGp9iwCRUmUVjdJT9uxEEHIH6I0YW8BMq2YnvDlSV10wI3apuzbl_hDUpgH8KYCNFUqRc-E2s4JqnsVwWMqdHt26Kqsw3O4qSK9NLlvdjzOnk1Xw.webp"
  },
  {
    recipeId: 4,
    dishName: "라자먀",
    imageUri: "https://i.namu.wiki/i/QncptNs6gl_Zyh-LEPsb_pEOkFhYKjvlOHUm0yNGp9iwCRUmUVjdJT9uxEEHIH6I0YW8BMq2YnvDlSV10wI3apuzbl_hDUpgH8KYCNFUqRc-E2s4JqnsVwWMqdHt26Kqsw3O4qSK9NLlvdjzOnk1Xw.webp"
  },
  ]


  const todayRecommend = (recipeIndex: number) => {
    // dummyRecipe 배열에서 recipeIndex에 해당하는 레시피를 찾아 설정합니다.
    // 배열 인덱스가 0부터 시작하므로 recipeIndex 값을 조정합니다.
    const recipe = dummyRecipe.find(recipe => recipe.recipeId === recipeIndex + 1);
    if (recipe) {
      setTodayRecipe(recipe);
    }
  };

  useEffect(() => {
    // todayRecommend('baloo', 1)
    console.log(index)
    todayRecommend(index)

    return () => {
    setIndex(1)  
    }

  }, [index])

  if (!todayRecipe) {
    return null
  }

  return (
    <RecommendItemScreen
      date={date}
      question="오늘의 추천 메뉴는?" // 아침?, 점심?, 저녁?
      dishName={todayRecipe?.dishName} // 글자수가 긴 거에 대한 라인 수정 필요할 듯
      imageUri={todayRecipe?.imageUri}
      onSharePress={() => navigation.navigate("Recipe")}
      onRetryPress={moveRecommendLanding}
    />
  )
}

export default RecommendScreen