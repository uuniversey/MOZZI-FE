import { useNavigation } from '@react-navigation/native'
import React, { useRef, useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'
import useVideoStore from '../../store/RecapStore'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #FFFEF2;
`

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 10px;
`

const View = styled.View``

// const FilmReel = styled(Animated.Image)`
//   width: 100px; 
//   height: 100px; 
//   position: absolute; 
//   left: 130px;
//   top: -30px;
// `

const Image = styled.Image`
  width: 200px; 
  height: 200px; 
  border-radius: 100px; 
  margin-bottom: 8px;
`

const Description = styled.Text`
  font-size: 24px;
  margin-top: 24px;
  text-align: center;
  color: #000;
`

const OuterBar = styled.View`
  background-color: #F9F7BB;
  width: 65%;
  height: 6px;
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
`

const InnerBar = styled(Animated.View)`
  background-color: #E4E196;
  width: 15%;
  height: 6px;
  border-radius: 10px;
`

const RecapLandingScreen: React.FC = () => {
  // const rootNavigation = useRootNavigation<'Main'>();
  const animatedValue = useRef(new Animated.Value(0)).current
  const navigation = useNavigation()
  const isVideoComplete = useVideoStore(state => state.isVideoComplete);

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   navigation.navigate("MakeShorts")
    // }, 5000) // 5초 = 5000밀리초


  if (isVideoComplete) {
    navigation.navigate("MakeShorts")
    useVideoStore.getState().setVideoComplete(false) // 상태 초기화
  }
    // 컴포넌트가 언마운트될 때 타이머를 정리함
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    return () => {

    }
    
  }, [isVideoComplete, animatedValue, navigation])

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 300], 
  })

  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => startAnimation()); 
    }

    startAnimation();
  }, [])

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-20deg', '20deg'],
  })
  
  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </BackButton>
      <View>
        <Animated.Image
            source={require('../../assets/recommend/ladle.png')}
            style={[
              styles.filmReel,
              { transform: [{ rotate: spin }] }, 
            ]}
          /> 
        <Image
          source={require('../../assets/recommend/pot.png')}
        />
      </View>
      <Description>아우엉님 님의 {'\n'} 추억을 요리하고 있어요!</Description>
      <OuterBar>
        <InnerBar style={{ transform: [{ translateX }] }} />
      </OuterBar>
    </Container>
  )
}

const styles = StyleSheet.create({
  filmReel: {
    width: 100, 
    height: 100, 
    position: 'absolute', 
    left: 130,
    top: -30,
  },
})

export default RecapLandingScreen
