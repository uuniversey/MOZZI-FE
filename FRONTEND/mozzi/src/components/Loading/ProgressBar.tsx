import React, { useRef, useEffect } from 'react'
import { Animated, View, StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

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

// Props 타입을 정의합니다 (필요하다면)
interface ProgressBarProps {
  style?: StyleProp<ViewStyle>
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }, [])

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 300], // 화면 너비에 따라 조정할 수 있음
  })

  return (
    <OuterBar style={style}>
      <InnerBar
        style={{
          transform: [{ translateX }],
        }}
      />
    </OuterBar>
  )
}