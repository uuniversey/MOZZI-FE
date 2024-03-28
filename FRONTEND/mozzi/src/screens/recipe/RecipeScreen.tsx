import { View, Text, TouchableOpacity, Animated, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'
import SpeechToText from './SpeechToText'
import TextToSpeech from './TextToSppeech'
import { Header } from '../../components/Header/Header'

import { useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import useRecipeStore from '../../store/RecipeStore'

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`

const IconContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Content = styled(View)`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Title = styled(Text)`
  font-size: 36px;
  align-self: center;
  margin: 20px 0px 10px 0px;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.palette.font}; 
`

const Order = styled(Text)`
  padding: 0 50px 0 50px;
  font-size: 20px;
  align-self: center;
  margin: 0px 0px 20px 0px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

const Body = styled(View)`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 330px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.palette.point};
`

const FoodImage = styled(Image)`
  width: 300px;
  height: 300px;
  border-radius: 5px;
`

const Tip = styled(Text)`
  padding: 0 50px 0 50px;
  font-size: 14px;
  align-self: center;
  margin: 20px 0px 20px 0px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

const Btn = styled(TouchableOpacity)`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 28px;
`

const Line = styled(View)`
  border-bottom-color: #000;
  border-bottom-width: 1px;
  width: 50%;
  align-self: center;
  margin-bottom: 40px;
`

function RecipeScreen () {
  const navigation = useNavigation()

  const { recipeDetailData } = useRecipeStore()

  const [ idx, setIdx ] = useState(1)
  const [ strIdx, setStrIdx ] = useState('01')
  const [ isLast, setIsLast ] = useState(false)

  const [translateY, setTranslateY] = useState(new Animated.Value(0))
  const [lastTranslateY, setLastTranslateY] = useState(0) // 마지막 translationY 값을 저장할 상태

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    {
      useNativeDriver: true,
      listener: event => {
        setLastTranslateY(event.nativeEvent.translationY)
      },
    },
  )

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const nextIdx = (parseInt(strIdx)+1).toString().padStart(2, '0')

      if (lastTranslateY < 0 && recipeDetailData[`MANUAL${nextIdx}`] !== "" ) {
        setIdx(prevIdx => {
          const nextIdx = prevIdx + 1
          setStrIdx(nextIdx.toString().padStart(2, '0'))
          return nextIdx
        })
      } else if (lastTranslateY > 0 && nextIdx !== '02') {
        setIdx(prevIdx => {
          const nextIdx = prevIdx - 1
          setStrIdx(nextIdx.toString().padStart(2, '0'))
          return nextIdx
        })
      }
      
      setLastTranslateY(0)

      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start()
    }
  }

  // !!!!참고!!!! 렌더링 문제 해결 솔루션 - 뎁스를 하나 더 들어가서 한다.
  const moveOrder = () => {
    setIdx(prevIdx => {
      const nextIdx = prevIdx + 1
      setStrIdx(nextIdx.toString().padStart(2, '0'))

      return nextIdx
    })
  }
  
  useEffect(() => {
    const nextIdx = (parseInt(strIdx)+1).toString().padStart(2, '0')
    if (recipeDetailData[`MANUAL${nextIdx}`] === "" || nextIdx == '21')
      {
        setIsLast(true)
      } else {
        setIsLast(false)
    }
  }, [strIdx])
  
  return (
    <Container>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>
      {/* <IconContainer>
        <SpeechToText />
        <TextToSpeech text={recipeDetailData[`MANUAL${strIdx}`]} />        
      </IconContainer> */}
      <GestureHandlerRootView>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Animated.View
            style={{
              transform: [{ translateY: translateY }],
            }}>
            
            <Content>
            <IconContainer>
              <SpeechToText />
              <TextToSpeech text={recipeDetailData[`MANUAL${strIdx}`]} />        
            </IconContainer>
              <Title>{recipeDetailData.RCP_NM}</Title>
              <Line />
              <Order>{recipeDetailData[`MANUAL${strIdx}`]}</Order>
              <Body>  
                <FoodImage
                  source={{ uri: recipeDetailData[`MANUAL_IMG${strIdx}`] }}
                />
              </Body>
              <Tip>TIP: {recipeDetailData.RCP_NA_TIP}</Tip>
              {isLast ? 
                '' :
                <Btn onPress={moveOrder}>
                  <Icon name="keyboard-double-arrow-down" size={50} color="silver" />
                </Btn> 
              }
            </Content>
          
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Container>
  )
}

export default RecipeScreen