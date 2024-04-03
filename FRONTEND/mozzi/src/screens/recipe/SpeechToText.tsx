import React, { useState, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import Voice from '@react-native-voice/voice'

import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

const Btn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 28px;
`

function SpeechToText({ onNext, onPrev }) {
  const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {

    // 음성 인식 결과 이벤트 핸들러
    Voice.onSpeechError = onSpeechError

    Voice.onSpeechResults = onSpeechResults
    startListening()
    // 청소 함수
    return () => {
      // 음성 인식이 활성화되어 있으면 정지
      Voice.isRecognizing().then(isRecognizing => {
        if (isRecognizing) {
          Voice.stop()
        }
      }).finally(() => {
        // 음성 인식 리소스와 리스너 제거
        Voice.destroy().then(Voice.removeAllListeners)
      })
    }
  }, [])

  const onSpeechResults = (e) => {
    const spokenText = e.value[0]
    console.log(e, '여러 데이터는 여기 담기나')
    console.log(e.value[0], '이거야?')
    setText(spokenText) // 화면에 표시할 텍스트 설정
    
    if (spokenText.includes("다음")) {
      onNext && onNext()
    } else if (spokenText.includes("이전")) {
      onPrev && onPrev()
    } else if (spokenText.includes("종료")) {
      stopListening()
    }
  }

  const startListening = () => {
    console.log('음성 인식 시작')
    Voice.start('ko-KR')
    setIsListening(true)
  }
  
  const stopListening = () => {
    console.log('음성 인식 종료')
    Voice.stop()
    setIsListening(false)
  }
  
  const onSpeechError = (e) => {
    console.log('onSpeechError: ', e)
  }
  
  return (
    <Btn onPress={isListening ? stopListening : startListening}>
      <Icon name={isListening ? "mic-off" : "mic"} size={30} />
    </Btn>
  )
}

export default SpeechToText