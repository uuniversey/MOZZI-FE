import React, { useEffect, useRef } from 'react'
import { Animated, View, Image, StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

const InnerContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

const OuterBar = styled(View)`
  background-color: ${(props) => props.theme.palette.point};
  width: 65%;
  height: 6px;
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
`;

const InnerBar = styled(Animated.View)`
  background-color: ${(props) => props.theme.palette.pointDark};
  width: 15%;
  height: 6px;
  border-radius: 10px;
`;

// 이미지 경로는 올바른지 확인하세요.
const diceImages = [
  require('../../assets/recommend/dice2.png'),
];

// Loading 컴포넌트의 props 타입을 정의합니다.
interface LoadingProps {
  onComplete: () => void; // 애니메이션이 끝나면 호출될 함수
  style?: StyleProp<ViewStyle>; // 선택적 스타일 prop
}

export const Dice: React.FC<DiceProps> = ({ onComplete, style }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current
  const bounceAnim = useRef(new Animated.Value(0)).current
  const animatedValue = useRef(new Animated.Value(0)).current

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
    ).start()
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 300], // 화면 너비에 따라 조정할 수 있음
  })

  return (
    <InnerContainer>
      <Animated.View
        style={{
          transform: [{ rotate: spin }, { translateY: bounceAnim }],
        }}>
        <Image source={diceImages[0]} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
      </Animated.View>
      <OuterBar>
        <InnerBar
          style={{
            transform: [{ translateX }],
          }}
        />
      </OuterBar>
    </InnerContainer>
  )
}
