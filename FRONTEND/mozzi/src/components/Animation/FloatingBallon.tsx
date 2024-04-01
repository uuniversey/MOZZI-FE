import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, Easing } from 'react-native';

const BalloonImage = styled.Image`
  width: 150px;
  height: 150px;
  opacity: 0.8;
`;

// Animated.View를 위한 styled-components 생성
const AnimatedView = styled(Animated.View)`
  position: absolute;
  bottom: 0;
`;

const FloatingBalloon = ({ source, duration = 5000, startDelay = 0 }) => {
  const moveVertical = useRef(new Animated.Value(0)).current;
  const moveHorizontal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 지그재그 움직임을 무한 반복
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveHorizontal, {
          toValue: 50,
          duration: duration / 4,
          useNativeDriver: true,
        }),
        Animated.timing(moveHorizontal, {
          toValue: -50,
          duration: duration / 4,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const startVerticalAnimation = () => {
      // 수직 이동 애니메이션
      moveVertical.setValue(0); // 수직 위치 초기화
      Animated.timing(moveVertical, {
        toValue: -800, // 목표 높이
        duration,
        useNativeDriver: true,
      }).start(() => startVerticalAnimation()); // 애니메이션이 완료되면 재귀적으로 재시작
    };

    startVerticalAnimation(); // 수직 애니메이션 시작
  }, [duration]);

  return (
    <AnimatedView
      style={{
        transform: [{ translateY: moveVertical }, { translateX: moveHorizontal }],
      }}>
      <BalloonImage source={source} />
    </AnimatedView>
  );
};

export default FloatingBalloon;
