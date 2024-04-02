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

const SearchSection = styled(View)`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-width: 1;
  border-radius: 8px;
  border-color: ${(props) => props.theme.palette.point};
  padding-left: 10px;
  margin-bottom: 15px;
`

const InputForm = styled(View)`
  position: absolute;
  top: 4px;
  left: 30px;
` 

const StyledAutocomplete = styled(Autocomplete)`
  z-index: 1001;
  width: 100%;
  background-color: rgba(255,255,255, 0.5);
  border: transparent;
`;

const StyledImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  margin-right: 5px;
`

const StyledView = styled(View)`
  width: 270px;
  height: 50px;
  flex-direction: row;
  padding-left: 5px;
  align-items: center;
  margin-top: 5px;
`

const ListButton = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 10px;
`

const NoResText = styled(Text)`
  font-size: 16;
  font-family: ${(props) => props.theme.fonts.content};
  margin-top: 30px;
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
    <SearchSection>
      <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
        <InputForm>
          <StyledAutocomplete
            data={filteredData}
            defaultValue={searchQuery}
            onChangeText={handleAutoComplete}
            inputContainerStyle={{ borderWidth: 0 }}
            flatListProps={{
              renderItem: ({ item }: { item: FoodItem }) => (
                <ListButton
                  onPress={() => {
                    setSearchQuery(item.foodName)
                    setRecipeName(item.foodName)
                    onSelect(item.foodName)
                    handleAutoComplete(item.foodName)
                    setFilteredData([])
                  }}>
                  <StyledView>
                    <StyledImage
                    source={{ uri: item.photoUrl }}
                    />
                    <Text>{item.foodName}</Text>
                  </StyledView>
                </ListButton>
              ),
              scrollEnabled: true,
              style: { ...styles.list, ...styles.shadow },
            }}
          />
          {filteredData.length === 0 && searchQuery.length > 0 && recipeName !== searchQuery && (
            <View>
              <NoResText>검색 결과가 없습니다.</NoResText>
            </View>
          )}
      </InputForm>
    </SearchSection>
  )
}



const styles = StyleSheet.create({
  searchIcon: {
    marginRight: 10,
  },
  list: {
    // position: 'absolute',
    top: 5,
    left: -5,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'transparent',
    maxHeight: 220,
    zIndex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
})