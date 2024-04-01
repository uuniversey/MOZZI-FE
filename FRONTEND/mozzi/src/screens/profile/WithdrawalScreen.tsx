import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import Icon from "react-native-vector-icons/Ionicons"

import useLoginStore from '../../store/LoginStore'
import useProfileStore from '../../store/ProfileStore'
import useDropdownStore from '../../store/DropdownStore'
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
  font-family: ${(props) => props.theme.fonts.fridge};
  color: ${(props) => props.theme.palette.font};
`

const WarningContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Warning = styled(Text)`
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.content};
`

const YesBtn = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
  align-self: flex-end;
  margin-top: 30px;
`

const CancelBtn = styled(TouchableOpacity)`
  border: 2px;
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
  padding-bottom: 20px;
`

const SadImg = styled(Image)`
  margin: 20px;
  align-self: center;
  width: 150px;
  height: 150px;
`

const BtnContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10;
`

const sadImg = [
  require('../../assets/illustration/withdraw-sad.png'),
];

function WithdrawalScreen() {
  const navigation = useNavigation()
  const { setIsLogin, userWithdrawal } = useLoginStore()
  const { profileReset } = useProfileStore()
  const { dropdownReset } = useDropdownStore()
  
  const handleWithdrawal = async (navigation) => {
    userWithdrawal()

    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')

    setIsLogin(false)

    profileReset()
    dropdownReset()

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  }

  return (
    <Container>
      <CenterView>
        <SadImg source={sadImg[0]} />
        <Title>정말 모찌를 떠나실 건가요?</Title>
        <WarningContainer>
          {/* <Icon name="warning-outline" size={16}/> */}
          <Warning>탈퇴가 완료된 계정은 다시 복구할 수 없습니다.</Warning>
        </WarningContainer>
        
        <BtnContainer>
          <CancelBtn onPress={navigation.goBack}>
            <BtnText>취소</BtnText>
          </CancelBtn>
          <YesBtn onPress={handleWithdrawal}>
            <BtnText>탈퇴</BtnText>
          </YesBtn>
        </BtnContainer>
      </CenterView>
    </Container>
  )
}

export default WithdrawalScreen