import { View, Text, Button } from 'react-native'
import React from 'react'

function LandingScreen() {
  
  const kakaoLogin = () => {
    console.log('카카오 로그인으로 대체해')
  }

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>랜딩 페이지</Text>
        <Button title="카카오 로그인" onPress={kakaoLogin} />
      </View>
    </>
  )
}

export default LandingScreen