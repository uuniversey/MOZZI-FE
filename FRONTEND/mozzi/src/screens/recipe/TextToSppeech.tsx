import React, { useState, useEffect } from 'react'
import { View, Button, TextInput, TouchableOpacity } from 'react-native'
import Tts from 'react-native-tts'

import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

const Btn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 28px;
`

const TextToSpeech = ({ text }) => {
  
  // 이거 하면 갱신될때마다 자동으로 읽어줌
  // useEffect(() => {
  //   Tts.speak(text);
  // }, [text])

  const speak = () => {
    Tts.setDefaultLanguage('ko-KR')
    Tts.speak(text)
  }
  
  return (
    <>
    <Btn>
      <Icon name="headset" size={40} onPress={speak}/>
    </Btn>
    </>
  )
}

export default TextToSpeech