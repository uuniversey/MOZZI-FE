import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../components/Header/Header'
import { Image, TouchableOpacity, View, Text } from 'react-native'

type Props = {
  date: string
  question: string
  dishName: string
  imageUri: string
  onSharePress: () => void
  onRetryPress: () => void
}

const RecommendItemScreen = ({
  date,
  question,
  dishName,
  imageUri,
  onSharePress,
  onRetryPress,
}: Props) => {
  const navigation = useNavigation()

  return (
    <>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>
      <Container>
        <TextContainer>
          <DateText>{date}</DateText>
          <QuestionText>{question}</QuestionText>
        </TextContainer>
        <DishImage source={{ uri: imageUri }} />
        <DishNameText>{dishName}</DishNameText>
        <Line />
        <ButtonContainer>
          <TimerContainer>
            {/* <Icon name="timer" size={20} color="#000" />
            <TimeText>1시간</TimeText> */}
          </TimerContainer>
          <RecipeButton onPress={onSharePress}>
            <ButtonText>레시피 보러가기</ButtonText>
          </RecipeButton>
          <RetryButton onPress={onRetryPress}>
            <ButtonText>다시 추천 받기</ButtonText>
          </RetryButton>
        </ButtonContainer>
      </Container>
    </>
  )
}

const Container = styled(View)`
  flex: 1;
  align-items: center;
  padding: 20px;
  background-color: #FFFEF2;
`

const TextContainer = styled(View)`
  margin-top: 20px;
  width: 350px;
  justify-content: flex-start;
`

const DateText = styled(Text)`
  font-size: 24px;
  color: #888;
  font-family: ${(props) => props.theme.fonts.content};
`

const QuestionText = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: ${(props) => props.theme.fonts.content};
`

const DishImage = styled(Image)`
  width: 300px;
  height: 300px;
  border-radius: 300px;
  margin-bottom: 10px;
`

const DishNameText = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  width: 70%;
  font-family: ${(props) => props.theme.fonts.content};
`

const Line = styled(View)`
  border-bottom-color: #000;
  border-bottom-width: 2px;
  width: 78%;
  align-self: center;
  margin-bottom: 10px;
`

const TimerContainer = styled(View)`
  flex-direction: row;
  width: 350px;
  justify-content: center;
  margin-bottom: 15px;
`

const TimeText = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  align-self: center;
  margin-bottom: 10px;
  font-family: ${(props) => props.theme.fonts.content};
`

const ButtonContainer = styled(View)`
  flex-direction: column;
  width: 350px;
`

const RecipeButton = styled(TouchableOpacity)`
  height: 60px;
  background-color: #F9F7BB;
  border-radius: 20px;
  justify-content: center;
  border-color: rgba(0, 0, 0, 0.2);
  border-width: 2px;
  elevation: 2;
  margin-bottom: 15px;
`

const RetryButton = styled(TouchableOpacity)`
  height: 60px;
  background-color: #FFFEF2;
  border-radius: 20px;
  justify-content: center;
  border-color: rgba(0, 0, 0, 0.2);
  border-width: 2px;
  elevation: 2;
`

const ButtonText = styled(Text)`
  font-weight: bold;
  text-align: center;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.content};
`

export default RecommendItemScreen
