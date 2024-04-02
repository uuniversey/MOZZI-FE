import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Autocomplete from 'react-native-autocomplete-input'
import styled from 'styled-components/native'
import useRecipeStore from '../../store/RecipeStore'

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
  flex-direction: row;
  align-items: center;
  margin: 10px 0px 5px 0px;
  background-color: ${(props) => props.theme.palette.background};
`

const StyledAutocomplete = styled(Autocomplete)`
  font-size: 16px;
  z-index: 1001;
  width: 100%;
  border: transparent;
  height: 50px;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-width: 1;
  border-radius: 8px;
  border-color: ${(props) => props.theme.palette.pointDark};
  color: ${(props) => props.theme.palette.font};
  margin-bottom: 5px;
  padding-left: 15px;
`;

const StyledImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  margin-right: 8px;
`

const StyledView = styled(View)`
  background-color: ${(props) => props.theme.palette.background};
  width: 100%;
  flex-direction: row;
  padding: 10px 0 10px 0;
  align-items: center;
`

const ListButton = styled(TouchableOpacity)`
`

const ListItem = styled(Text)`
  color: ${(props) => props.theme.palette.font};
  font-size: 16px;
`

const NoResText = styled(Text)`
  font-size: 16;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
  margin-top: 20px;
  margin-bottom: 20;
  padding-left: 15px;
`

export const SearchBar = ({ data, onSelect }: SearchBarProps) => {

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredData, setFilteredData] = useState<FoodItem[]>([])
  const [recipeName, setRecipeName] = useState<string>('')

  const { setIngredientData } = useRecipeStore()

  // 자동 완성 데이터 필터링
  const handleAutoComplete = (text: string) => {
    setIngredientData(text)
    setSearchQuery(text)
    const filtered = data.filter(item => item.foodName.includes(text))
    setFilteredData(filtered)
    console.log('----', filtered)
  }


  return (
    <View>
      <SearchSection>
        {/* <Icon name="search" size={20} color="#000" style={styles.searchIcon} /> */}
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
                  <ListItem>{item.foodName}</ListItem>
                </StyledView>
              </ListButton>
            ),
            scrollEnabled: true,
            style: { ...styles.list, ...styles.shadow },
          }}
        />
      </SearchSection>
      <View>
        {filteredData.length === 0 && searchQuery.length > 0 && recipeName !== searchQuery && (
          <View>
            <NoResText>검색 결과가 없습니다.</NoResText>
          </View>
        )}            
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  list: {
    borderWidth: 0,
    maxHeight: 450,
    zIndex: 1,
  },
  shadow: {    
  },
})