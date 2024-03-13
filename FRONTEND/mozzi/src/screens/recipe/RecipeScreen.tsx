import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
`;

function RecipeScreen () {

  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <>
    <Container>
      <TouchableOpacity onPress={goBack}>
        <Icon name="keyboard-arrow-left" size={35} color="black" />
      </TouchableOpacity>

      <View>
        <Text>레시피 이름</Text>
        <Text>레시피 순서</Text>
        <Text>레시피 사진</Text>
        <Text>레시피 설명</Text>
      </View>
    </Container>
    </>

  )
}

export default RecipeScreen