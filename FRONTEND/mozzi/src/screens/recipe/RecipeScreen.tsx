import { View, Text, TouchableOpacity, Animated, Image, Easing } from 'react-native'
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
  padding: 0px 16px 0px 16px;
`

const Title = styled(Text)`
  font-size: 36px;
  align-self: center;
  margin: 20px 0px 10px 0px;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.palette.font}; 
`

const Order = styled(Text)`
  font-size: 18px;
  align-self: center;
  padding: 0 8px 0 8px;
  margin-bottom: 20px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

const Body = styled(View)`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  background-color: ${(props) => props.theme.palette.point};
`

const FoodImage = styled(Image)`
  width: 290px;
  height: 290px;
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

const EndingText = styled(Text)`
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
  const [ isOpen, setIsOpen ] = useState(false)
  const [tipHeight, setTipHeight] = useState(new Animated.Value(0))
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

  // "다음" 명령 처리
  const handleNext = () => {
    const nextIdx = (parseInt(strIdx) + 1).toString().padStart(2, '0')
    if (recipeDetailData[`MANUAL${nextIdx}`]) {
      setIdx(prevIdx => prevIdx + 1)
      setStrIdx(nextIdx)
    }
  }

  // "이전" 명령 처리
  const handlePrev = () => {
    const prevIdx = (parseInt(strIdx) - 1).toString().padStart(2, '0')
    if (prevIdx !== '00') {
      setIdx(prevIdx => prevIdx - 1)
      setStrIdx(prevIdx)
    }
  }

  /// 렌더링 문제 해결 솔루션 - 뎁스를 하나 더 들어가서 한다.
  const moveOrder = () => {
    setIdx(prevIdx => {
      const nextIdx = prevIdx + 1
      setStrIdx(nextIdx.toString().padStart(2, '0'))

      return nextIdx
    })
  }
  
  // 끝에 도착하면 화살표 없애기
  useEffect(() => {
    const nextIdx = (parseInt(strIdx)+1).toString().padStart(2, '0')
    if (recipeDetailData[`MANUAL${nextIdx}`] === "" || nextIdx == '21')
      {
        setIsLast(true)
      } else {
        setIsLast(false)
    }
  }, [strIdx])
  
  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  // isOpen 상태가 변경될 때마다 애니메이션 실행
  useEffect(() => {
    Animated.timing(tipHeight, {
      toValue: isOpen ? 150 : 0, // isOpen이 true면 높이를 150으로, false면 0으로 변경
      duration: 500, // 애니메이션 지속 시간
      useNativeDriver: false, // 높이 변경은 네이티브 드라이버를 사용하지 않음
      easing: Easing.inOut(Easing.ease), // 시작과 끝에서 부드럽게
    }).start()
  }, [isOpen, tipHeight])

  return (
    <Container>
      <Header>
        <Header.Icon iconName="arrow-back" onPress={navigation.goBack} />
      </Header>

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
                <SpeechToText onNext={handleNext} onPrev={handlePrev} />
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
              {isOpen ? (
                  <Animated.View style={{height: tipHeight}}>
                    <Tip onPress={handleIsOpen}>TIP: {recipeDetailData.RCP_NA_TIP}</Tip>
                  </Animated.View>
                ) : (
                  <Tip onPress={handleIsOpen}>TIP</Tip>
                )
              }
              {isLast ? ( 
                <EndingText>레시피의 마지막 순서입니다.</EndingText> 
                ) : (
                <Btn onPress={moveOrder}>
                  <Icon name="keyboard-double-arrow-down" size={50} color="silver" />
                </Btn>
                ) 
              }
            </Content>
          
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Container>
  )
}

export default RecipeScreen