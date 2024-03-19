import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Header } from '../../components/Header/Header'

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
`

const InnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const DiceImage = styled.Image`
  width: 200px;
  height: 182.4px;
  /* resize-mode: contain; */
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

function RecommendLandingScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const nextIndex = route.params.nextIndex

  const goBack = () => {
    navigation.goBack();
  }

  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Recommend", { index: nextIndex })
    }, 3500) // 5초 = 5000밀리초

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    return () => clearTimeout(timer)

  }, [animatedValue, navigation])

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 300], 
  })

  return (
    <>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>
      <Container>
        <InnerContainer>
          <DiceImage source={require('../../assets/recommend/pizza.jpg')} />
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
