import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Autocomplete from 'react-native-autocomplete-input'
import styled from 'styled-components/native'


const StyledView = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  padding-left: 5px;
  align-items: center;
  margin-top: 5px;
`

export const SearchBar = ({ data, onSelect }) => {

  const [ tmpData, setTmpData ] = useState([])
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
    setRecipeName(item)
    handleAutoComplete(item)
    setSearchQuery(item)
    setFilteredData([])
  }

  useEffect(() => {
    console.log('템프데이터', tmpData)
    onSelect(tmpData)
  }, [tmpData])

  return (
    <View style={styles.searchSection}>
      <View style={styles.InputSection}>
        <Autocomplete
          data={filteredData}
          onChangeText={handleAutoComplete}
          inputContainerStyle={styles.input}
          flatListProps={{
            renderItem: ({ item }: { item: FoodItem }) => (
              <TouchableOpacity
                style={styles.listButton}
                onPress={() => {handleSelect(item)}}>
                <StyledView>
                  <Text>{item}</Text>
                </StyledView>
              </TouchableOpacity>
            ),
            scrollEnabled: true,
            style: { ...styles.list, ...styles.shadow },
          }}
        />
          {filteredData.length === 0 && searchQuery.length > 0 && recipeName !== searchQuery && (
            <View style={styles.emptySearchResults}>
              <Text>검색 결과가 없습니다.</Text>
            </View>
          )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchSection: {
    marginTop: 10,
    width: 350,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E196',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  InputSection: {
    position: 'absolute',
    top: 4,
    left: 35,
    width: 327,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: 300,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  list: {
    position: 'absolute',
    top: -2,
    left: -6,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'transparent',
    maxHeight: 220,
    zIndex: 25,
  },
  listButton: {
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  emptySearchResults: {
    alignItems: 'center', // 메시지를 중앙 정렬
    justifyContent: 'center',
    padding: 10, // 적당한 패딩
  },
})
