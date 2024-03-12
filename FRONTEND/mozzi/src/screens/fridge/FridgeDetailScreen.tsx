import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import note from '../../assets/fridge/note.png'


const NoteImg = styled.Image`
  width: 340;
  /* height: 480; */
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
      <Text>{item}</Text>
      <NoteImg source={note} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>FridgeDetailScreen</Text>
      </View>
    </>
  )
}

export default FridgeDetailScreen