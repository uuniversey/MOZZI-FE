import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, Image } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native'

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

const OuterBar = styled(View)`
  background-color: ${(props) => props.theme.palette.point};
  width: 65%;
  height: 6px;
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
`

const InnerBar = styled(Animated.View)`
  background-color: ${(props) => props.theme.palette.pointDark};
  width: 15%;
  height: 6px;
  border-radius: 10px;
`

const diceImages = [
  require('../../assets/recommend/dice2.png'),
]

function RecommendLandingScreen() {
  const navigation = useNavigation();
  const rotateAnim = useRef(new Animated.Value(0)).current
  const bounceAnim = useRef(new Animated.Value(0)).current
  const animatedValue = useRef(new Animated.Value(0)).current
  let animationRef = useRef(null)

  useEffect(() => {
    // 주사위 튀기기 및 회전 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -50,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // 로딩 바 애니메이션
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();

    // 3.5초 후 화면 전환
    const timer = setTimeout(() => {
      navigation.navigate("Recommend")
    }, 3500);

    return () => {
      clearTimeout(timer)
    };
  }, [navigation]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 300], // 화면 너비에 따라 조정할 수 있음
  });

  return (
    <>
      <Container>
        <InnerContainer>
        <Animated.View
          style={{
            transform: [{ rotate: spin }, { translateY: bounceAnim }],
          }}>
          <Image source={diceImages[0]} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
        </Animated.View>
          <Description>아우엉님 님의 {'\n'}레시피를 찾고 있어요!</Description>
          <OuterBar>
            <InnerBar
              style={{
                transform: [{ translateX }],
              }}
            />
          </OuterBar>
        </InnerContainer>
      </Container>
    </>
  )
}

export default RecommendLandingScreen
