import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import useLoginStore from '../../store/LoginStore'
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`

const Title = styled(Text)`
  font-size: 24px;
  text-align: center;
  width: 100%;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.palette.font}; 
`

const Btn = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
  align-self: flex-end;
  margin-top: 30px;
`

const CancelBtn = styled(TouchableOpacity)`
  border: 1px;
  border-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
  align-self: flex-end;
  margin-top: 30px;
`

const BtnText = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font}; 
`

const CenterView = styled(View)`
  display: flex;
  height: 100%;
  justify-content: center;
`

const JustifyView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

function WithdrawalScreen() {
  const navigation = useNavigation()
  const { setIsLogin, userWithdrawal } = useLoginStore()

  const handleWithdrawal = async (navigation) => {
    userWithdrawal()

    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')

    setIsLogin(false)

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  }

  return (
    <Container>
      <CenterView>
        <Title>정말 모찌를 떠나실 건가요?</Title>
        <JustifyView>
          <CancelBtn onPress={navigation.goBack}>
            <BtnText>취소</BtnText>
          </CancelBtn>
          <Btn onPress={handleWithdrawal}>
            <BtnText>탈퇴</BtnText>
          </Btn>
        </JustifyView>
      </CenterView>
    </Container>
  )
}

export default WithdrawalScreen