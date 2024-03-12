import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import note from '../../assets/fridge/note.png'
import clip from '../../assets/fridge/clip.png'

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
`

const MenuItem = styled.Text`
  position: absolute;
  top: 100;
  font-size: 12px;
`

function FridgeDetailScreen ({route}) {
  
  const { item } = route.params;

  const navigation = useNavigation()

  const goBack = () => {
   navigation.goBack()
  }
  
  return (
    <>
      <TouchableOpacity onPress={goBack}>
        <Text>냉장고로 돌아가기</Text>
      </TouchableOpacity>
      
      <Note>
        <ClipImg source={clip} />
        <NoteImg source={note} />
        <MenuItem>{item}</MenuItem>
      </Note>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>FridgeDetailScreen</Text>
      </View>
    </>
  )
}

export default FridgeDetailScreen