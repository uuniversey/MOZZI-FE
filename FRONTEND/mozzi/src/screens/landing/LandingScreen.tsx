import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

import kakao from '../../assets/landing/kakao-login-icon.png'
import wave from '../../assets/landing/wave-bg.png'
import icon1 from '../../assets/landing/icon1.png'
import icon2 from '../../assets/landing/icon2.png'
import icon3 from '../../assets/landing/icon3.png'
import icon4 from '../../assets/landing/icon4.png'
import icon5 from '../../assets/landing/icon5.png'
import icon6 from '../../assets/landing/icon6.png'
import icon7 from '../../assets/landing/icon7.png'
import icon8 from '../../assets/landing/icon8.png'
import icon9 from '../../assets/landing/icon9.png'

const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: #FFFDD4;
`
const BgImg = styled.Image` 
  position: relative;
  width: 100%;
  height: 80%;
  top: -20%;
`

const FoodIcon = styled.Image`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left ? props.left + 'px' : undefined};
  right: ${props => props.right ? props.right + 'px' : undefined};
`

const TitleContainer = styled.View`
  position: absolute;
  margin-top: 20%;
  padding-left: 15%;
`
const SmallTitle = styled.Text`
  font-size: 48;
`
const BigTitle = styled.Text`
  font-size: 96;
`

const LoginContainer = styled.View`
  margin-top: 50px;
  display: flex;
  align-items: center;
`

function LandingScreen() {
  
  const kakaoLogin = () => {
    console.log('카카오 로그인으로 대체해')
  }

  return (
    <Container>

      <BgImg source={wave} />
      <TitleContainer>
        <SmallTitle>오늘 모 먹찌?</SmallTitle>
        <BigTitle>모찌</BigTitle>        
      </TitleContainer>

      <FoodIcon source={icon1} width={53} height={53} top={334.82} left={77}/>
      <FoodIcon source={icon2} width={64} height={64} top={361.72} left={179}/>
      <FoodIcon source={icon3} width={65} height={65} top={270} left={286}/>
      <FoodIcon source={icon4} width={66} height={66} top={442.42} left={44}/>
      <FoodIcon source={icon5} width={50} height={50} top={529.09} left={190}/>
      <FoodIcon source={icon6} width={67} height={67} top={467.32} left={290}/>
      <FoodIcon source={icon7} width={58} height={58} top={765.21} left={53}/>
      <FoodIcon source={icon8} width={65} height={65} top={707.43} left={149}/>
      <FoodIcon source={icon9} width={80} height={80} top={742.3} left={277}/>

      <LoginContainer>
        <TouchableOpacity onPress={kakaoLogin}>
          <Image source={kakao} />
        </TouchableOpacity>
      </LoginContainer>

    </Container>
  )
}

export default LandingScreen