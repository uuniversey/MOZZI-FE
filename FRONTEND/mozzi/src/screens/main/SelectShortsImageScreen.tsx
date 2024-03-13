import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from '../../components/Header/Header'
import { useNavigation } from '@react-navigation/native'

type ButtonProps = {
  title: string;
  onPress: () => void
}

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #FFFEF2;
  padding: 20px;
`

const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  align-self: flex-start;
`

const ButtonContainer = styled.View`
  flex-direction: column;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #F9F7BB;
  border-radius: 10px;
  height: 129;
`

const ButtonGroup = styled.View`
  margin-top: 20;
  flex-direction: row;
  justify-content: space-between;
  background-color: #F9F7BB;
  border-radius: 10px;
`

const StyledButton = styled.TouchableOpacity`
  background-color: #E4E196;
  border-radius: 10px;
  padding: 10px 15px;
`

const ButtonText = styled.Text`
  color: #000;
  font-size: 12px;
`

const ImageContainer = styled.View`
  padding: 16px;
  background-color: #F9F7BB;
  border-radius: 10px;
  /* width: 350;
  height: 190; */
`

const ImageGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 26px;
  padding-bottom: 26px;
  background-color: #F9F7BB;
  border-radius: 10px;
`

const StyledImage = styled.Image`
  width: 95px;
  height: 95px;
`

const IconButton = styled(Icon.Button)`
  margin-top: 20px;
  border-radius: 10px;
  background-color: #EFEAB5;
`

const MoodButton: React.FC<ButtonProps> = ({ title, onPress }) => (
  <StyledButton onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </StyledButton>
)


function SelectShortsImageScreen () {
  
  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  const onPress = () => {
    console.log('Button pressed');
  }

  return (
    <>
      <Header>
          <Header.Icon iconName="chevron-back" onPress={goBack} />
      </Header>
      <ScreenContainer>
        <HeaderTitle>쇼츠 만들기 (1/2)</HeaderTitle>
        <ButtonContainer>
          <IconFontAwesome name="music" size={30}/>
          <ButtonGroup>
            <MoodButton title="편안한" onPress={onPress} />
            <MoodButton title="감성적인" onPress={onPress} />
            <MoodButton title="산뜻한" onPress={onPress} />
            <MoodButton title="잔잔한" onPress={onPress} />
            <MoodButton title="발랄한" onPress={onPress} />
          </ButtonGroup>
        </ButtonContainer>
        <ImageContainer>
          <Icon name="photo-size-select-actual" size={30}/>
          <ImageGroup>
            <StyledImage source={require('../../assets/recommend/pizza.jpg')} />
            <StyledImage source={require('../../assets/recommend/pizza.jpg')} />
            <StyledImage source={require('../../assets/recommend/pizza.jpg')} />
          </ImageGroup>
        </ImageContainer>
      </ScreenContainer>
    </>
  )
}


export default SelectShortsImageScreen