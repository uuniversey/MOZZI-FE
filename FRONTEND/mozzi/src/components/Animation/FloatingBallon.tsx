import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, Image } from 'react-native';

const Ballon = styled(Image)`
  width: 100px;
  height: 100px;
  opacity: 0.8;
`

const FloatingBalloon = ({ source, duration = 5000, startDelay = 0 }) => {
  const moveVertical = useRef(new Animated.Value(0)).current; // 풍선의 수직 시작 위치
  const moveHorizontal = useRef(new Animated.Value(0)).current; // 풍선의 수평 시작 위치

  useEffect(() => {
    // 수직 움직임
    const verticalUp = Animated.timing(moveVertical, {
      toValue: -500, // 위로 얼마나 움직일지
      duration: duration,
      useNativeDriver: true,
    });

    // 지그재그 움직임
    const zigzagMove = Animated.loop(
      Animated.sequence([
        Animated.timing(moveHorizontal, {
          toValue: 50, // 오른쪽으로 얼마나 움직일지
          duration: duration / 4,
          useNativeDriver: true,
        }),
        Animated.timing(moveHorizontal, {
          toValue: -50, // 왼쪽으로 얼마나 움직일지
          duration: duration / 4,
          useNativeDriver: true,
        }),
      ]),
    );

    // 수직과 지그재그 애니메이션 동시 실행
    Animated.parallel([verticalUp, zigzagMove]).start();

  }, [moveVertical, moveHorizontal, duration]);


  return (
    <Animated.View
      style={{
        transform: [{ translateY: moveVertical }, { translateX: moveHorizontal }],
        position: 'absolute',
        bottom: 0, // 화면 바닥에서 시작
      }}>
      <Ballon source={source} />
    </Animated.View>
  );
};

export default FloatingBalloon;
