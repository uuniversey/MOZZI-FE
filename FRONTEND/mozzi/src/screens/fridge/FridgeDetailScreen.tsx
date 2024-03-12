import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import styled from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import note from '../../assets/fridge/note.png'
import clip from '../../assets/fridge/clip.png'

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
`;

const Title = styled.Text`
  margin-top: 50px;
  margin-bottom: 20px;
`

const ClipImg = styled.Image`
  position: absolute;
  top: 20;
  z-index: 1001;
`

const NoteImg = styled.Image`
  box-shadow: 5px 5px 5px gray;
`

const Note = styled.View`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const TitleContainer = styled.View`
  position: absolute;
  top: 110;
  display: flex;
  align-items: center;
`

const TitleImg = styled.Image`
  display: inline;
  width: 30px;
  height: 30px;
`

const MenuItem = styled.Text`
  display: inline;
  font-size: 12px;
`
const InputFood = styled.TextInput`
  width: 350px;
  border-width: 2px;
  border-color: #E4E196;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  margin-top: 30px;
  background-color: white;
  align-self: center;
`;

function FridgeDetailScreen ({route}) {
  const [text, setText] = useState('');
  
  const { item } = route.params; // item을 받음
  const { name, img } = item;

  const navigation = useNavigation()

  const goBack = () => {
   navigation.goBack()
  }
  
  return (
    <Container>
      <TouchableOpacity onPress={goBack}>
        <Text>냉장고로 돌아가기</Text>
      </TouchableOpacity>
      
      <Note>
        <ClipImg source={clip} />
        <NoteImg source={note} />
        <TitleContainer>
          {img && <TitleImg source={img} />}
          <MenuItem>{name}</MenuItem>
        </TitleContainer>      
      </Note>
      
      <InputFood
          onChangeText={setText}
          value={text}
          placeholder="재료를 입력해 주세요..."
      />
      
    </Container>
  )
}

export default FridgeDetailScreen