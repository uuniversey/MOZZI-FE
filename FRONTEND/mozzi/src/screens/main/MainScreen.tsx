import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components/native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../components/Header/Header'

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
  align-items: center;
`

const ContentContainer = styled.View`
  padding-top: 40px;
  padding-left: 22px;
  padding-right: 22px;
`

const Greeting = styled.Text`
  font-family: 'MaruBuri-Regular';
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-top: 16px;
`

const Question = styled.Text`
  font-size: 22px;
  color: #333;
  margin-bottom: 16px;
`

const Card = styled.View`
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

const MealQuestion = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  align-self: flex-start;
`

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  margin-bottom: 8px;
`

const MealName = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`

const Button = styled.TouchableOpacity`
  background-color: rgba(211, 236, 216, 0.7);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 350px;
  margin-top: 16px;
`

const ButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`

function MainScreen() {
  const navigation = useNavigation()

  const moveSearch = () => {
    navigation.navigate("Search")
  }

  const moveRecap = () => {
    navigation.navigate("Recap")
  }

  const [recipe, setRecipe] = useState<string>('')
  const accessToken = 'eyJraWQiOiI5ZjI1MmRhZGQ1ZjIzM2Y5M2QyZmE1MjhkMTJmZWEiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJkMGJjOTVkNzY3MGQ1NTIwNDlkZDVkYzQ2ZDc5OTlhMCIsInN1YiI6IjMzOTc4ODUyNTIiLCJhdXRoX3RpbWUiOjE3MTA5MjI3NTksImlzcyI6Imh0dHBzOi8va2F1dGgua2FrYW8uY29tIiwiZXhwIjoxNzEwOTY1OTU5LCJpYXQiOjE3MTA5MjI3NTl9.fB-MVI2EmpQRTZBX1gCTwP3_a22nyF9_djbphsfoPheVOj3tetp0GCEVyonNuurmfAvDZv3AFiGgFQ-tmlV_I60Dd1gShqxs-VN3HBDRwG-JG1izjBZfKYRYLIFdGkkA5gmoFDrKvQA2SmXk7Wllz_wipuq3Z3roMBVKIBTJ_V56clMK_CvnYbhNWbXsBfJbww-UQqDGPy9XWsBFlB-gJQJs8spcd7KG2SDCk9iFswp4E50xkL1ZLBqqgtH40MquEdVB4y9F2OcB5zgfLCPqOQwIAls1viU4zc3F0CiYyYTs_k8i1YVCQUxTmV4yLJI4R9nWL4ZwHGDyZv8E5qs7EQ'
  // 로그인 유저 호출
  // 최다 뷰카운트 호출
  const popularRecipe = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/datas/get_highest_viewed_food/', {
        headers: {
          // Bearer 토큰을 Authorization 헤더에 추가
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log(response)
      // data에 저장해둠(respose 어디에 값이 들어있는지 확인할 것)
      const data = await response.data
      setRecipe(data)
    } catch (error) {
      //응답 실패
      console.error(error)
    }
  }

  // const handleCardPress = () => {
  //   // navigation.navigate("DiaryDetail", { recipe: recipe })
  //   navigation.navigate("DiaryDetail")
  // }

  const moveDiaryDetail = (date) => {
    navigation.navigate("DiaryDetail", {date: date})
  }

  // 오늘의 최다 조회수 레시피인데
  // 여기 페이지 들어올 때마다 호출할지
  // 맨 처음에 한 번만 호출할지 생각해봐야할 듯
  useEffect(() => {
    // popularRecipe()
    return () => {
    }
  }, [])
  

  return (
    <>
      <Header>
        <Header.Icon iconName="search" onPress={moveSearch} />
      </Header>
      <Container>
        <ContentContainer>
          <Greeting>환영해요, 아우엉님 님!</Greeting>
          {/* <Greeting>환영해요, {userName} 님!</Greeting> */}
          <Question>오늘은 어떤 레시피를 도전할까요?</Question>
          <TouchableOpacity>
            <Card>
              <MealQuestion>오늘 모찌에서 {"\n"}가장 많이 사랑받은 레시피는?</MealQuestion>
              <StyledImage
                source={require('../../assets/recommend/pizza.jpg')}
                // source={{recipe.photo}}
                />
              <MealName>피자 최고</MealName>
              {/* <MealName>{recipe.foodName}</MealName> */}
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
