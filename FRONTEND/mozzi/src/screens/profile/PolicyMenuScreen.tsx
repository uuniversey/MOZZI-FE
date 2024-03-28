import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header/Header'

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
  display: flex;
  align-items: center;
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

const Border = styled(View)`
  width: 350px;
  border-bottom-width: 1px;
  border-color: #E0E0E0;
`

function PolicyMenuScreen() {
  const navigation = useNavigation()

  const moveTermsOfUse = () => {
    navigation.navigate("TermsOfUse")
  }

  const movePrivacy = () => {
    navigation.navigate("Privacy")
  }

  return (
    <Container>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>
      
      <MenuList>
        <ListButton onPress={moveTermsOfUse}>
          <ListBtnText>모찌 서비스 이용약관</ListBtnText>
          <Icon name="keyboard-arrow-right" size={25} color="black"/>
        </ListButton>
        <Border></Border>
        <ListButton onPress={movePrivacy}>
          <ListBtnText>개인 정보 처리 방침</ListBtnText>
          <Icon name="keyboard-arrow-right" size={25} color="black"/>
        </ListButton>
        <Border></Border>
      </MenuList>

    </Container>
  )
}

export default PolicyMenuScreen