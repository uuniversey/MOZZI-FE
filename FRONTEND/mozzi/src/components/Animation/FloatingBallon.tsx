import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, View, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import useRecipeStore from '../../store/RecipeStore';

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

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const FloatingBalloon = ({ source, duration = 5000, startDelay = 0 }) => {
  const navigation = useNavigation()
  const { recipeData, getRecipe, getRecipeDetail, isReady } = useRecipeStore()
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

  const moveRecipe = async() => {
    await getRecipe()
    let idx = Math.floor(Math.random() * recipeData.length) 
    await getRecipeDetail(recipeData[idx].foodName)
    console.log(isReady)
    if (isReady) {
      navigation.navigate("Event")
    }
  }

  return (
    <AnimatedTouchableOpacity
      onPress={moveRecipe}
      style={{
        position: 'absolute',
        bottom: 0,
        transform: [{ translateY: moveVertical }, { translateX: moveHorizontal }],
      }}>
      <BalloonImage source={source} />
    </AnimatedTouchableOpacity>
  );
};

export default FloatingBalloon;
