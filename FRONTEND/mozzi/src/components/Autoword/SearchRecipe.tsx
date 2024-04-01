import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Autocomplete from 'react-native-autocomplete-input'
import styled from 'styled-components/native'

interface FoodItem {
  photoUrl: string
  foodName: string
}

interface SearchBarProps {
  data: FoodItem[]
  onSelect: (recipeName: string) => void
}

const StyledImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 100px;
  margin-right: 5px;
`

const StyledView = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  padding-left: 5px;
  align-items: center;
  margin-top: 5px;
`

export const SearchBar = ({ data, onSelect }: SearchBarProps) => {

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredData, setFilteredData] = useState<FoodItem[]>([])
  const [recipeName, setRecipeName] = useState<string>('')

  // 자동 완성 데이터 필터링
  const handleAutoComplete = (text: string) => {
    setSearchQuery(text)
    const filtered = data.filter(item => item.foodName.includes(text))
    setFilteredData(filtered)
    console.log('----', filtered)
  }

  useEffect(() => {
    if (searchQuery) {
      const selectedItem = filteredData.find(item => item.foodName === searchQuery);
      if (selectedItem) {
        onSelect(selectedItem.foodName)
      }
    }
  }, [searchQuery, filteredData, onSelect])

  return (
    <>
     <View style={styles.searchSection}>
        <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
          <View style={styles.InputSection}>
            <Autocomplete
              data={filteredData}
              defaultValue={searchQuery}
              onChangeText={handleAutoComplete}
              inputContainerStyle={styles.input}
              flatListProps={{
                renderItem: ({ item }: { item: FoodItem }) => (
                  <TouchableOpacity
                    style={styles.listButton}
                    onPress={() => {
                      setSearchQuery(item.foodName)
                      setRecipeName(item.foodName)
                      onSelect(item.foodName)
                      handleAutoComplete(item.foodName)
                      setFilteredData([])
                    }}>
                    <StyledView>
                      <StyledImage
                      // source={require('../../assets/recommend/pizza.jpg')}
                      source={{ uri: item.photoUrl }}
                      />
                      <Text>{item.foodName}</Text>
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
    </>
  )
}



const styles = StyleSheet.create({
  searchSection: {
    marginTop: 30,
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
    // marginTop: 30,
    // width: 350,
    // height: 55,
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: '#E4E196',
    // borderRadius: 8,
    // paddingLeft: 10,
    // marginBottom: 15,
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
    // position: 'absolute',
    top: -2,
    left: -6,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'transparent',
    maxHeight: 220,
    zIndex: 1,
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