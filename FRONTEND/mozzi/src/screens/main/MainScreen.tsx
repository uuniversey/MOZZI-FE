import React, { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components/native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { SearchHeader } from '../../components/Header/SearchHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useLoginStore from '../../store/LoginStore'
import useProfileStore from '../../store/ProfileStore'

interface RecipeItem {
  foodName: string
  photo: string
}

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
  align-items: center;
`

const ContentContainer = styled(View)`
  padding-top: 40px;
  padding-left: 22px;
  padding-right: 22px;
`

const Greeting = styled(Text)`
  font-size: 20px;
  color: ${(props) => props.theme.palette.font};
  margin-top: 16px;
  font-family: ${(props) => props.theme.fonts.title};
`

const Question = styled(Text)`
  font-size: 22px;
  color: ${(props) => props.theme.palette.font};
  margin-bottom: 16px;
  font-family: ${(props) => props.theme.fonts.title};
`

const Card = styled(View)`
  width: 350px;
  height: 350px;
  background-color: rgba(247, 207, 207, 0.7);
  border-radius: 15px;
  padding: 16px;
  align-items: center;
  /* margin-vertical: 8px; */
  margin-top: 8px;
  margin-bottom: 8px;
`

const MealQuestion = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.palette.font};
  margin-bottom: 28px;
  align-self: flex-start;
  font-family: ${(props) => props.theme.fonts.title};
`

const StyledImage = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 200px;
  margin-bottom: 8px;
  /* border: 1px solid ${(props) => props.theme.palette.pointDark}; */
`

const MealName = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.palette.font};
  margin-bottom: 8px;
  font-family: ${(props) => props.theme.fonts.title};
`

const Button = styled(TouchableOpacity)`
  background-color: rgba(211, 236, 216, 0.7);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 350px;
  margin-top: 16px;
`

const ButtonText = styled(Text)`
  font-size: 24px;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.title};
`

function MainScreen() {
  const navigation = useNavigation()

  const moveSearch = () => {
    navigation.navigate("Search")
  }

  const moveRecap = () => {
    navigation.navigate("Recap")
  }

  const [recipe, setRecipe] = useState<RecipeItem | null>(null)
  const { userData } = useLoginStore()
  const { profileData } = useProfileStore()
  // 로그인 유저 호출
  // 최다 뷰카운트 호출
  const popularRecipe = async () => {
    const token = await AsyncStorage.getItem('accessToken')
    try {
      // const response = await axios.get(`recommend/datas/get_highest_viewed_food/`, {
      const response = await axios.get(`https://a304.site/api/recommend/datas/get_highest_viewed_food/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      })
      console.log(response.data.data)
      // data에 저장해둠(respose 어디에 값이 들어있는지 확인할 것)
      const data = await response.data.data
      setRecipe(data)
      console.log(recipe)
    } catch (error) {
      //응답 실패
      console.error(error)
    }
  }

  // const handleCardPress = () => {
  //   // navigation.navigate("DiaryDetail", { recipe: recipe })
  //   navigation.navigate("DiaryDetail")
  // }

  const moveRecipeDetail = () => {
    navigation.navigate("Recipe")
  }

  // 오늘의 최다 조회수 레시피인데
  // 여기 페이지 들어올 때마다 호출할지
  // 맨 처음에 한 번만 호출할지 생각해봐야할 듯
  useEffect(() => {
    console.log(userData)
    popularRecipe()
    return () => {
    }
  }, [])
  
 
  return (
    <>
      <SearchHeader>
        <SearchHeader.Icon iconName="search" onPress={moveSearch} />
      </SearchHeader>
      <Container>
        <ContentContainer>
          {/* <Greeting>환영해요, 아우엉님 님!</Greeting> */}
          {profileData?.nickname? (
            <Greeting>환영해요, {profileData.nickname} 님!</Greeting>
          ) : (
            <Greeting>환영해요, {userData.nickname} 님!</Greeting>
          )}
          <Question>오늘은 어떤 레시피를 도전할까요?</Question>
          <TouchableOpacity
            onPress={moveRecipeDetail}>
            <Card>
              <MealQuestion>오늘 모찌에서 {"\n"}가장 많이 사랑받은 레시피는?</MealQuestion>
              <StyledImage
                // source={require('../../assets/recommend/pizza.jpg')}
                source={{ uri: recipe?.photo }}
                />
              {/* <MealName>피자 최고</MealName> */}
              <MealName>{recipe?.foodName}</MealName>
            </Card>
          </TouchableOpacity>
          <Button onPress={moveRecap}>
            <ButtonText>나의 모찌 기록</ButtonText>
          </Button>
        </ContentContainer>
      </Container>
    </>
  )
}

export default MainScreen
