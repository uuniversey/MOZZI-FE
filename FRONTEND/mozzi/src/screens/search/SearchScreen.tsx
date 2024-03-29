import { View, Text, TouchableOpacity, Image } from 'react-native'
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
  align-items: center;
`

const SearchView = styled(View)`
  margin: 30px;
  height: 60%;
`

const Card = styled(View)`
  width: 350px;
  height: 350px;
  background-color: rgba(247, 207, 207, 0.7);
  border-radius: 15px;
  padding: 16px;
  align-items: center;
  /* margin-vertical: 8px; */
  margin-top: 8px;
  margin-bottom: 8px;
`

const StyledImage = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 200px;
  margin-bottom: 8px;
  /* border: 1px solid ${(props) => props.theme.palette.pointDark}; */
`

const MealName = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.palette.font};
  margin-bottom: 8px;
  font-family: ${(props) => props.theme.fonts.title};
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
  const { getRecipe, recipeData, recipeDetailData, getRecipeDetail } = useRecipeStore()

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

      {/* <Card>
        <StyledImage
          source={{ uri: recipeDetailData?.photo }}
          />
        <MealName>{recipeDetailData?.foodName}</MealName>
      </Card> */}

      {selectedRecipeName ?
       <SelectedText>
        {selectedRecipeName}의 레시피로 이동할까요?
      </SelectedText> : ''
      }

      <Btn onPress={moveRecipe}>
        <BtnText>이동</BtnText>
      </Btn>
    </Container>
  )
}

export default SearchScreen