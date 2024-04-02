import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, Image } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native'
import { Dice } from '../../components/Animation/Dice'
import { ProgressBar } from '../../components/Animation/ProgressBar'
import useLoginStore from '../../store/LoginStore'
import useProfileStore from '../../store/ProfileStore'

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`

const InnerContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Description = styled(Text)`
  font-size: 24px;
  margin-top: 24px;
  text-align: center;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.content};
`

function RecommendLandingScreen() {
  const { userData } = useLoginStore()
  const { profileData } = useProfileStore()
  const navigation = useNavigation();

  useEffect(() => {
    // 3.5초 후 화면 전환
    const timer = setTimeout(() => {
      navigation.navigate("Recommend")
    }, 3500)

    return () => {
      clearTimeout(timer)
    };
  }, [navigation]);


  return (
    <Container>
      <InnerContainer>
        <Dice />
        {profileData?.nickname? (
          <Description>{profileData.nickname} 님의 {'\n'}레시피를 찾고 있어요!</Description>
        ) : (
          <Description>{userData.nickname} 님의 {'\n'}레시피를 찾고 있어요!</Description>
        )}
        <ProgressBar />
      </InnerContainer>
    </Container>
  )
}

export default RecommendLandingScreen
