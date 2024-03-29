import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../components/Header/Header'
import useRecipeStore from '../../store/RecipeStore'

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background};
`;

const TextContainer = styled(View)`
  display: flex;
  align-items: center;
`
const Question = styled(Text)`
  font-size: 24px;
  margin: 24px 0 12px 0;
  text-align: center;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.title};
`

const ChoiceContainer = styled(View)`
  margin: 20px 0 50px 0;
  display: flex;
  flex-direction: row;
`

const ChoiceButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 220px;
  margin: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
`;

const StyledImage = styled(Image)`
  border: 1px solid ${(props) => props.theme.palette.pointDark};
  width: 100px;
  height: 100px;
  border-radius: 100px;
`

const LoadingText = styled(Text)`
  
`

const ChoiceText = styled(Text)`
  font-size: 12px;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.fridge};
  margin-bottom: 10px;
`;

function WorldcupScreen() {
  const navigation = useNavigation()
  const [step, setStep] = useState(1)
  const { getRecipe, recipeData } = useRecipeStore()
  const [currentChoices, setCurrentChoices] = useState([])

  useEffect(() => {
    if (recipeData.length > 0) {
      updateChoices(recipeData);
    }
  }, [recipeData]);

  useEffect(() => {
    getRecipe()
    // console.log(recipeData)
  }, [])

  // 상태를 업데이트하는 함수를 정의합니다.
  const updateChoices = (recipes) => {
    const shuffled = recipes.sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 2)
    setCurrentChoices(selected)
  };

  const handleChoice = (choice) => {
    updateChoices(recipeData)
    console.log('선택한 음식:', choice.foodName) // 선택된 음식 로그
    if (step < 3) {
      setStep(step + 1)
      // 여기서는 간단하게 상태만 업데이트합니다. 실제로는 새로운 데이터를 불러와야 할 수 있습니다.
      setCurrentChoices(prevChoices =>
        prevChoices.sort(() => 0.5 - Math.random())
      );
    } else {
      navigation.navigate('RecommendLanding') // 실제로 사용할 스크린 이름으로 변경
      setStep(1); // 스텝 초기화
    }
  };

  return (
    <>
      <Container>
        {recipeData.length === 0 ? ( // recipeData가 비어있을 때 "로딩 중..." 표시
          <LoadingText>로딩 중...</LoadingText>
        ) : (
          <>
            <TextContainer>
              <Question>어떤 음식을 선호하시나요?</Question>
              <Text>({step}/3)</Text>          
            </TextContainer>
            <ChoiceContainer>
              {currentChoices.map((choice, index) => (
                <ChoiceButton key={index} onPress={() => handleChoice(choice)}>
                  <ChoiceText>{choice.foodName}</ChoiceText>
                  <StyledImage source={{ uri: choice.photoUrl }} style={{ width: 150, height: 150 }} />
                </ChoiceButton>
              ))}
            </ChoiceContainer>
          </>
        )}
      </Container>
    </>
  );
}

export default WorldcupScreen
