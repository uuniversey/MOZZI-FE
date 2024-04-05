import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../components/Header/Header'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import LongButton from '../../components/Button/LongButton'

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
  flag,
  onSharePress,
  onRetryPress,
}: Props) => {
  const navigation = useNavigation()

  return (
    <>
      <Header>
        <Header.Icon iconName="arrow-back" onPress={() => {navigation.reset({
          index: 0,
          routes: flag ? [{ name: 'Main' }] : [{ name: 'Worldcup' }],
        })
      }} />
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
          <LongButton 
            text="레시피 보러가기"
            onPress={onSharePress}
          />
          <LongButton 
            text="다시 추천 받기"
            onPress={onRetryPress}
            style={{
              backgroundColor: '#e1dfd4'
            }}
          />
        </ButtonContainer>
      </Container>
    </>
  )
}

const Container = styled(View)`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background};
`

const TextContainer = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 32px;
  width: 100%;
  justify-content: flex-start;
`

const DateText = styled(Text)`
  font-size: 24px;
  color: ${(props) => props.theme.palette.gray};
  font-family: ${(props) => props.theme.fonts.content};
`

const QuestionText = styled(Text)`
  font-size: 32px;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.title};
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
  color: ${(props) => props.theme.palette.font};
  margin-bottom: 10px;
  text-align: center;
  width: 70%;
  font-family: ${(props) => props.theme.fonts.content};
`

const Line = styled(View)`
  border-bottom-color: ${(props) => props.theme.palette.font};
  border-bottom-width: 2px;
  width: 70%;
  padding-left: 16px;
  padding-right: 16px;
  align-self: center;
  margin-bottom: 10px;
`

const TimerContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-bottom: 15px;
`

const ButtonContainer = styled(View)`
  flex-direction: column;
  width: 90%;
`

export default RecommendItemScreen
