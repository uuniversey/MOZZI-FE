import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

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
      <TouchableOpacity onPress={goBack}>
        <Text style={{ fontSize: 40 }}>⇐</Text>
      </TouchableOpacity>

      <View style={{ margin: 30 }}>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'rgb(228, 225, 150)'}}
          onChangeText={handleKeyword}
          value={keyword}
          placeholder='🔎 레시피를 입력해 주세요'
        />
        <Text>{'\n'}</Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 200}}>추천 검색어</Text>

        <View style={{ borderBottomWidth: 1, borderBottomColor: ' rgb(128, 128, 128)' }} />
      </View>
    </>
  )
}

export default SearchScreen