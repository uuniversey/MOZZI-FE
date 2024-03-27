import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import useProfileStore from '../../store/ProfileStore'
import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header/Header'

const Container = styled(View)`
  flex: 1;
  background-color: #FFFEF2;
`

function PolicyScreen() {
  const navigation = useNavigation()
  return (
    <Container>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>

      <Text>약관 페이지</Text>
    </Container>
  )
}

export default PolicyScreen