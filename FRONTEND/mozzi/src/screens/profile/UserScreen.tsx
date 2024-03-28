import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

import useProfileStore from '../../store/ProfileStore'
import useLoginStore from '../../store/LoginStore'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`

const TitleContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0 50px 0;
`

const Title = styled(Text)`
  font-size: 36px;
  margin: 50px 0px 0px 0px;
  height: 100%;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.palette.font};
`

const JustifyView = styled(View)`
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const TopBorder = styled(View)`
  width: 350px;
  border-bottom-width: 3px;
  border-color: #E0E0E0;
`

const Border = styled(View)`
  width: 350px;
  border-bottom-width: 1px;
  border-color: #E0E0E0;
`

const LogoutBtn = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
`

const LogoutText = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

const MenuList = styled(View)`
  display: flex;
  align-items: center;
`

const ListButton = styled(TouchableOpacity)`
  width: 350px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ListBtnText = styled(Text)`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

function UserScreen() {
  const { setIsLogin } = useLoginStore()
  const { profileData } = useProfileStore()
  const navigation = useNavigation()

  const handleLogout = async (navigation) => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')

    setIsLogin(false)

    // 네비게이션을 리셋하고 로그인 화면으로 이동합니다.
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  }

  const moveProfile = () => {
    navigation.navigate("Profile")
  }

  const moveWithdrawal = () => {
    navigation.navigate("Withdrawal")
  }

  const movePolicy = () => {
    navigation.navigate("Policy")
  }

  return (
    <Container>
      <TitleContainer>
        <JustifyView>
          <Title>{profileData.nickname} 님</Title>
          <LogoutBtn onPress={handleLogout}>
            <LogoutText>로그아웃</LogoutText>
          </LogoutBtn>
        </JustifyView>
        <TopBorder></TopBorder>
      </TitleContainer>
      <MenuList>
        <ListButton onPress={moveProfile}>
          <ListBtnText>내 정보 관리</ListBtnText>
          <Icon name="keyboard-arrow-right" size={25} color="black"/>
        </ListButton>
        <Border></Border>
        <ListButton onPress={movePolicy}>
          <ListBtnText>약관 및 정책</ListBtnText>
          <Icon name="keyboard-arrow-right" size={25} color="black"/>
        </ListButton>
        <Border></Border>
        <ListButton onPress={moveWithdrawal}>
          <ListBtnText>서비스 탈퇴</ListBtnText>
          <Icon name="keyboard-arrow-right" size={25} color="black"/>
        </ListButton>
        <Border></Border>
      </MenuList>
    </Container>
  )
}

export default UserScreen