import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

import { SearchBar } from '../../components/AutoWord/SearchRecipe'
import { Header } from '../../components/Header/Header'
import { useNavigation } from '@react-navigation/native'

import useRecipeStore from '../../store/RecipeStore'

interface FoodItem {
  id: number
  image: string
  title: string
}

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
`

const RecommendText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 200px;
`

function SearchScreen () {
  
  const navigation = useNavigation()
  const { getRecipe, recipeData2 } = useRecipeStore()

  const [recipeData, setRecipeData] = useState<FoodItem[] | null>(null)
  const [ keyword, setKeyword ] = useState<string>('')
  const handleKeyword = (newText: string) => {
    setKeyword(newText)
  }

  
  return (
    <Container>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>

      <View style={{ margin: 30 }}>
        {recipeData && <SearchBar data={recipeData} />}

        <RecommendText>추천 검색어</RecommendText>

        <View style={{ borderBottomWidth: 1, borderBottomColor: ' rgb(128, 128, 128)' }} />
      </View>
    </Container>
  )
}

export default SearchScreen