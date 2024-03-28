import React, { useEffect, useState } from 'react'
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { Header } from '../../components/Header/Header'
import axios from '../../../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface RecipeCardProps {
  id: number
  title: string
  imageSource: any
  day: string
}

const RecipeCardContainer = styled(View)`
  background-color: #F9F7BB;
  border-radius: 20px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
`

const CardDay = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  align-self: flex-start;
  font-family: ${(props) => props.theme.fonts.content};
`

const CardImage = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`

const CardTitle = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
  font-family: ${(props) => props.theme.fonts.title};
`

const RecipeCard = ({ title, imageSource, day }: RecipeCardProps) => {
  return (
    <RecipeCardContainer>
      <CardDay>{day}</CardDay>
      <CardImage source={imageSource} />
      <CardTitle>{title}</CardTitle>
    </RecipeCardContainer>
  )
}

const Container = styled(View)`
  flex: 1;
  background-color: #FFFEF2;
  padding-right: 10px;
  padding-left: 10px;
`

const HeaderText = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  align-self: flex-start;
  padding-left: 20px;
  padding-right: 20px;
  font-family: ${(props) => props.theme.fonts.title};
`

const ActionButton = styled(TouchableOpacity)`
  flex-direction: column;
  border-radius: 20px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
  border-color: rgba(0, 0, 0, 0.2);
  background-color: #FFFEF2;
  border-width: 2px;
  elevation: 2;
`

const ButtonText = styled(Text)`
  margin-left: 8px;
  font-size: 16px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.content};
`

function RecapScreen() {
  const navigation = useNavigation()
  const [myRecipes, setMyRecipes] = useState<RecipeCardProps[]>([])

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
    // callMakeVideoApi('baloo365', 1)
  }

  const goBack = () => {
    navigation.goBack()
  }

  // const myRecipes = [
  //   { title: '양념장 전', day: '2024-03-16', imageSource: require('../../assets/recommend/pizza.jpg') },
  //   { title: '한 접시 풀잎', day: '2024-02-21', imageSource: require('../../assets/recommend/chicken.jpg') },
  // ]

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
        <Header.Icon iconName="chevron-back" onPress={goBack} />
      </Header>
      <Container>
        <HeaderText>나의 모찌 기록</HeaderText>
        {myRecipes.map((recipe: RecipeCardProps, index) => (
          <RecipeCard
            key={index}
            day={convertDay(recipe.photoDate)}
            // day={`${recipe.day} 전 먹은 음식`}
            title={recipe.foodName}
            imageSource={{ uri: recipe.photoUrl }}
          />
        ))}
        
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
