import React, { useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity, Image, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { Header } from '../../components/Header/Header'
import axios from '../../../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useRecipeStore from '../../store/RecipeStore'

interface RecipeCardProps {
  id: number
  foodName: string
  photoUrl: any
  photoDate: string
}

const RecipeCardContainer = styled(View)`
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;
  /* margin: 8px 16px 8px 16px; */
  align-items: center;
  justify-content: center;
`

const NoRecipeCardContainer = styled(View)`
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;
  height: 250px;
`

const NoRecipeText = styled(Text)`
  font-size: 18px;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.content};
`

const CardDay = styled(Text)`
  font-size: 16px;
  align-self: flex-start;
  margin-bottom: 10px;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.title};
`

const CardImage = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 150px;
`

const CardTitle = styled(Text)`
  font-size: 16px;
  margin-top: 8px;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.content};
`

const RecipeCard = ({ id, foodName, photoUrl, photoDate }: RecipeCardProps) => {
  return (
    <RecipeCardContainer>
      <CardDay>{photoDate}</CardDay>
      <CardImage source={photoUrl} />
      <CardTitle>{foodName}</CardTitle>
    </RecipeCardContainer>
  )
}

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
  padding: 0px 16px 20px 16px;
`

const HeaderText = styled(Text)`
  font-size: 32px;
  color: ${(props) => props.theme.palette.font};
  margin-bottom: 20px;
  align-self: flex-start;
  font-family: ${(props) => props.theme.fonts.title};
`

const ActionButton = styled(TouchableOpacity)`
  flex-direction: column;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.point2};
`

const ButtonText = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.content};
`

function RecapScreen() {
  const navigation = useNavigation()
  const [myRecipes, setMyRecipes] = useState<RecipeCardProps[]>([])
  const { getRecipeDetail } = useRecipeStore()

  const callMakeVideoApi = async (userId: string, bgmCategory: number) => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/maker/video_yk/', {
        user_id: userId,
        bgm_category: bgmCategory,
      });
      console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }


  // 랜덤으로 리캡 카드 2개 렌더링
  const callRecapFood = async () => {
    const token = await AsyncStorage.getItem('accessToken')
    try {
      const response = await axios.get(`https://a304.site/api/mozzi/diary/getrandomdiaries`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      })
      console.log(response.data.foods)
      // response.data에 값이 들어가 있는지 확인 필요
      setMyRecipes(response.data.foods)
      console.log("말도 안 돼~~~~~~~~~~~", myRecipes)
    } catch (error) {
      //응답 실패
      console.error(error)
    }
  }

  useEffect(() => {
    callRecapFood()

  }, [])

  const SelectShortsImage = () => {
    navigation.navigate("SelectShortsImage")
  }

  const goBack = () => {
    navigation.goBack()
  }

  const moveRecapDetail = (foodName: string) => {
    if (foodName) {
      getRecipeDetail(foodName)
    }
    navigation.navigate("Recipe")
  }

  // const moveRecipe = () => {
  //   getRecipeDetail(todayRecipe.foodName)
  //   navigation.navigate("Recipe")
  // }

  const convertDay = (day: string): string => {
    const today = new Date();
    const inputDate = new Date(day);
    const difference = today.getTime() - inputDate.getTime();
    const days = difference / (1000 * 3600 * 24);
  
    if (days < 7) {
      return `${Math.floor(days)}일 전 먹은 음식`
    } else if (days < 30) {
      return "지난 주 먹은 음식"
    } else if (days < 90) {
      return "한 달 전 먹은 음식"
    } else if (days < 180) {
      return "3달 전 먹은 음식"
    } else if (days < 365) {
      return "6개월 전 먹은 음식"
    } else {
      return "작년에 먹은 음식"
    }
  };
  
  return (
    <>
      <Header>
        <Header.Icon iconName="arrow-back" onPress={goBack} />
      </Header>
      <Container>
        <HeaderText>나의 모찌 기록</HeaderText>
        {myRecipes?.length > 0 ? (
              myRecipes.map((recipe: RecipeCardProps, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => moveRecapDetail(recipe.foodName)}>
                    <RecipeCard
                      photoDate={convertDay(recipe.photoDate)}
                      foodName={recipe.foodName}
                      photoUrl={{ uri: recipe.photoUrl }}
                    />
                </TouchableOpacity>
              ))
            ) : (
              <NoRecipeCardContainer>
                <NoRecipeText>아직 모찌 기록이 없습니다.</NoRecipeText>
              </NoRecipeCardContainer>
            )
        }
        <ActionButton 
          onPress={SelectShortsImage}>
          <IconEntypo name="video" size={50} color="#000" />
          <ButtonText>쇼츠 만들기</ButtonText>
        </ActionButton>
      </Container>
    </>
  )
}

export default RecapScreen
