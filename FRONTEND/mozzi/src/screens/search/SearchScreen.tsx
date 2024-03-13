import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
`

const Btn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 28px;
  position: absolute;
  top: 10px;
  left: 5px;
`

function SearchScreen () {
  
  const navigation = useNavigation()

  const goBack = () => {
   navigation.goBack()
  }

  const [ keyword, setKeyword ] = useState<string>('')
  const handleKeyword = (newText: string) => {
    setKeyword(newText)
  }
  
  return (
    <>
      <Container>
        <TouchableOpacity onPress={goBack}>
          <Icon name="keyboard-arrow-left" size={35} color="black" />
        </TouchableOpacity>

        <View style={{ margin: 30 }}>
          <Btn>
            <Icon name="search" size={30} color="black" />
          </Btn>

          <TextInput
            style={{ borderWidth: 1, borderColor: 'rgb(228, 225, 150)'}}
            onChangeText={handleKeyword}
            value={keyword}
            placeholder='          레시피를 입력해 주세요.'
          />
          <Text>{'\n'}</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 200}}>추천 검색어</Text>

          <View style={{ borderBottomWidth: 1, borderBottomColor: ' rgb(128, 128, 128)' }} />
        </View>
      </Container>
    </>
  )
}

export default SearchScreen