import React, { useEffect, useState } from 'react'
import { Alert, TouchableOpacity, Image } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { Header } from '../../components/Header/Header'
import axios from 'axios'

interface RecipeCardProps {
  title: string
  imageSource: any
  day: string
}

const RecipeCardContainer = styled.View`
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

const CardDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
  align-self: flex-start;
`

const CardImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`

const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
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

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
  padding-right: 10px;
  padding-left: 10px;
`

const HeaderText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  align-self: flex-start;
  padding-left: 20px;
  padding-right: 20px;
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

const ButtonText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  font-weight: bold;
`

function RecapScreen() {
  const navigation = useNavigation()
  // const [myRecipes, setMyRecipes] = useState<RecipeCardProps[]>([]);

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
  
  useEffect(() => {
    // callRecapFood({nickName})
  }, [])


  // 랜덤으로 리캡 카드 2개 렌더링
  const callRecapFood = async (nickName: string) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/maker/video_yk/?nickname=${nickName}`);
      console.log(response);
      // response.data에 값이 들어가 있는지 확인 필요
      // setRecapFoods(response.data)
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  const SelectShortsImage = () => {
    navigation.navigate("SelectShortsImage")
    // callMakeVideoApi('baloo365', 1)
  }

  const goBack = () => {
    navigation.goBack()
  }

  const myRecipes = [
    { title: '양념장 전', day: '일주일 전 먹은 음식', imageSource: require('../../assets/recommend/pizza.jpg') },
    { title: '한 접시 풀잎', day: '한 달 전 먹은 음식', imageSource: require('../../assets/recommend/chicken.jpg') },
  ]

  return (
    <>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={goBack} />
      </Header>
      <Container>
        <HeaderText>나의 모찌 기록</HeaderText>
        {myRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            day={recipe.day}
            // day={`${recipe.day} 전 먹은 음식`}
            title={recipe.title}
            imageSource={recipe.imageSource}
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
