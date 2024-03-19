import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import Voice from '@react-native-voice/voice'

function SpeechToText() {
  const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(true)

  useEffect(() => {

    // 음성 인식 결과 이벤트 핸들러
    Voice.onSpeechError = onSpeechError

    Voice.onSpeechResults = onSpeechResults
    startListening()
    // 청소 함수
    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const onSpeechResults = (e) => {
    console.log(e)
    console.log(2)
    const spokenText = e.value[0]
    setText(spokenText) // 화면에 표시할 텍스트 설정
    
    if (spokenText.includes("다음") && !isListening) {
      startListening()
    }

    else if (spokenText.includes("이전") && !isListening) {
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
    <>
    <Text>인식된 텍스트: {text}</Text>
      <Button title="듣기 시작" onPress={startListening} disabled={isListening} />
      <Button title="듣기 중지" onPress={stopListening} disabled={!isListening} />
    </>
  )
}

export default SpeechToText