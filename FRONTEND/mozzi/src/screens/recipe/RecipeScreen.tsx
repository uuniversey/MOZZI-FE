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

const Title = styled(Text)`
  font-size: 36px;
  align-self: center;
  margin: 50px 0px 10px 0px;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.palette.font}; 
`

const Order = styled(Text)`
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
  width: 350px;
  height: 350px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.palette.point};
`

const FoodImage = styled(Image)`
  width: 300px;
  height: 300px;
  border-radius: 5px;
`

const Tip = styled(Text)`
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
      
      <SpeechToText />
      <TextToSpeech text={recipeDetailData[`MANUAL${strIdx}`]} />

      <GestureHandlerRootView>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Animated.View
            style={{
              transform: [{ translateY: translateY }],
            }}>
            
            <View>
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
            </View>
          
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Container>
  )
}

export default RecipeScreen


const dummyData = {
  "RCP_PARTS_DTLS": "고구마(50g), 바나나(17g), 달걀(1개),\n크림치즈(10g), 우유(20g), 생크림(25g),\n딸기잼(15g), 젤라틴(8g), 바닐라빈(1g),\n올리고당(2g)",
  "RCP_PAT2": "후식",
  "RCP_NM": "뼈해장국",
  "ATT_FILE_NO_MK": "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_01097_1.png",
  "ATT_FILE_NO_MAIN": "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_01097_2.png",
  "RCP_NA_TIP": " 뼈해장국은 고구마 바나나 무스로 변화할 수 있어요",
  "MANUAL_IMG01": "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_01097_1.JPG",
  "MANUAL_IMG02": "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_01097_2.JPG",
  "MANUAL_IMG03": "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_01097_3.JPG",
  "MANUAL_IMG04": "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_01097_4.JPG",
  "MANUAL_IMG05": "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_01097_5.JPG",
  "MANUAL_IMG06": "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_01097_6.JPG",
  "MANUAL_IMG07": "",
  "MANUAL_IMG08": "",
  "MANUAL_IMG09": "",
  "MANUAL_IMG10": "",
  "MANUAL_IMG11": "",
  "MANUAL_IMG12": "",
  "MANUAL_IMG13": "",
  "MANUAL_IMG14": "",
  "MANUAL_IMG15": "",
  "MANUAL_IMG16": "",
  "MANUAL_IMG17": "",
  "MANUAL_IMG18": "",
  "MANUAL_IMG19": "",
  "MANUAL_IMG20": "",

  "MANUAL01": "1. 삶아 으깬 고구마와 으깬\n바나나를 섞는다.",
  "MANUAL02": "2. 볼에 달걀노른자, 올리고당,\n우유, 바닐라빈을 넣고 중탕시켜\n걸쭉하게 만든 뒤 1번과 섞는다.",
  "MANUAL03": "3. 2번에 휘핑한 생크림을 넣고 섞은\n뒤 젤라틴을 넣는다.",
  "MANUAL04": "4. 딸기잼에 우유를 넣고 끓여\n젤리를 만든다.",
  "MANUAL05": "5. 무스 틀에 3번과 딸기잼 젤리를\n차곡차곡 넣어 굳힌다.",
  "MANUAL06": "6. 굳힌 무스위에 크림치즈를\n올린다.",
  "MANUAL07": "",
  "MANUAL08": "",
  "MANUAL09": "",
  "MANUAL10": "",
  "MANUAL11": "",
  "MANUAL12": "",
  "MANUAL13": "",
  "MANUAL14": "",
  "MANUAL15": "",
  "MANUAL16": "",
  "MANUAL17": "",
  "MANUAL18": "",
  "MANUAL19": "",
  "MANUAL20": "",
}