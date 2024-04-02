import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'
import styled from 'styled-components/native'

import useProfileStore from '../../store/ProfileStore'
import { Line } from 'react-native-svg'

const Container = styled(View)`
  width: 100%;
  /* max-height: 20%; */
  flex-direction: row;
  align-items: center;
  margin: 10px 0px 5px 0px;
  background-color: ${(props) => props.theme.palette.background};
`

const CustomAutoComplete = styled(Autocomplete)`
  background-color: ${(props) => props.theme.palette.background};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.palette.light};
`

const IngreList = styled(View)`
  background-color: ${(props) => props.theme.palette.background};
  width: 100%;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`

const EmptySearchResults = styled(View)`
  align-items: center;
  justify-content: center;
`

const JustifyView = styled(View)`
  flex-direction: row;
  align-items: center;
`

const SelectedStyle = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-right: 12px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.palette.point};
`

const TextSelectedStyle = styled(Text)`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

export const SearchBar = ({ data, onSelect, flag }) => {
  const { profileData } = useProfileStore()
  const [ tmpData, setTmpData ] = useState(
    profileData.foods && profileData.foods.length > 0
    ? profileData.foods
      .filter(food => food.isLike === flag)
      .map(food => food.ingredientName)
      : []
    )
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ filteredData, setFilteredData ] = useState([])
  const [ recipeName, setRecipeName ] = useState('')

  // 자동 완성 데이터 필터링
  const handleAutoComplete = (text) => {
    setSearchQuery(text)
    const filtered = data.filter(item => item.includes(text))
    setFilteredData(filtered)
    console.log('----', filtered)
  }

  const handleSelect = (item) => {
    setTmpData(prev => [...prev, item])
    setSearchQuery('')
    setRecipeName(item)
    handleAutoComplete(item)
    setFilteredData([])
  }

  useEffect(() => {
    console.log('템프데이터', tmpData)
    onSelect(tmpData)
  }, [tmpData])

  return (
    <View>
    <Container>
      <CustomAutoComplete
        data={filteredData}
        onChangeText={handleAutoComplete}
        inputContainerStyle={{ 
          borderWidth: 0,
          borderColor: 'transparent'
        }}
        flatListProps={{
          renderItem: ({ item }: { item: FoodItem }) => (
            <TouchableOpacity
              onPress={() => {handleSelect(item)}}>
              <IngreList>
                <Text>{item}</Text>
              </IngreList>
            </TouchableOpacity>
          ),
          scrollEnabled: true,
        }}
      />
    </Container>
    <View>
      {filteredData.length === 0 && searchQuery.length > 0 && recipeName !== searchQuery && (
        <EmptySearchResults>
          <Text>검색 결과가 없습니다.</Text>
        </EmptySearchResults>
      )}

      <JustifyView>
        {tmpData.map((item, index)=>(
          <TouchableOpacity key={index} onPress={() => setTmpData(tmpData.filter(data => data !== item))}>
            <SelectedStyle>
              <TextSelectedStyle>{item}</TextSelectedStyle>
            </SelectedStyle>
          </TouchableOpacity>
        ))}
      </JustifyView>
    </View>
  </View>
  )
}
