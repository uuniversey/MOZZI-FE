import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

import { SearchBar } from '../../components/AutoWord/SearchRecipe'
import { Header } from '../../components/Header/Header'
import { useNavigation } from '@react-navigation/native'

import useRecipeStore from '../../store/RecipeStore'


const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`

const SearchView = styled(View)`
  margin: 30px;
  height: 60%;
`

const Hr = styled(View)`
  margin: 30px;
  border-bottom-width: 1px;
  border-bottom-color: rgb(128, 128, 128);
`

const Btn = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
  align-self: flex-end;
  margin: 30px;
`

const BtnText = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

const SelectedText = styled(Text)`
  margin: 0px 30px 0px 30px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

function SearchScreen () {
  
  const navigation = useNavigation()
  const { getRecipe, recipeData, getRecipeDetail } = useRecipeStore()

  const [selectedRecipeName, setSelectedRecipeName] = useState<string>('')


  const handleSelectRecipe = (recipeName: string) => {
    setSelectedRecipeName(recipeName)
  }

  const moveRecipe = () => {
    if (selectedRecipeName) {
      getRecipeDetail(selectedRecipeName)
    }
    navigation.navigate("Recipe")
  }

  useEffect(() => {
    getRecipe()
  }, [])
  
  return (
    <Container>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>

      <SearchView>
        <SearchBar data={recipeData} onSelect={handleSelectRecipe}/>
      </SearchView>
      {selectedRecipeName ?
       <SelectedText>
        {selectedRecipeName}의 레시피로 이동할게요
      </SelectedText> : ''
      }
      <Hr />
      <Btn onPress={moveRecipe}>
        <BtnText>이동</BtnText>
      </Btn>
    </Container>
  )
}

export default SearchScreen