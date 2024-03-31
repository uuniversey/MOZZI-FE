import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../components/Header/Header'
import useRecipeStore from '../../store/RecipeStore'
import { Dice } from '../../components/Loading/Dice'
import { ProgressBar } from '../../components/Loading/ProgressBar'

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
  margin: 20px 0 10px 0;
  text-align: center;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.title};
`

const ChoiceContainer = styled(View)`
  margin: 20px 0 0 0;
  display: flex;
  /* flex-direction: row; */
`

const ChoiceButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 10px;
  padding: 20px 10px 20px 10px;
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
  font-size: 24px;
  margin-top: 24px;
  text-align: center;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.content};
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
  const { getRecipe, recipeData, updatePreferences } = useRecipeStore()
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
    // console.log(selected)
  };

  const handleChoice = async (selectedChoice) => {
    // if (step === 1) {
    //   updateChoices(recipeData);
    // }
    // updateChoices(recipeData)
    // 현재 선택지 중에서 사용자가 선택하지 않은 음식을 찾습니다.
    const nonSelectedChoice = currentChoices.find(choice => choice.foodName !== selectedChoice.foodName);

    // 선택된 음식에는 1을, 선택되지 않은 음식에는 -1을 할당합니다.
    const foodPreferences = [
      { foodName: selectedChoice.foodName, value: 1 },
      { foodName: nonSelectedChoice.foodName, value: -1 }
    ];

    console.log('음식 선호도 업데이트:', foodPreferences);

    // API 호출을 통해 서버에 선호도를 업데이트합니다.
    await updatePreferences(foodPreferences);

    // 다음 선택지를 준비합니다.
    if (step < 3) {
        setStep(step + 1);
        updateChoices(recipeData);
    } else {
        // 마지막 단계에서는 결과 화면으로 이동합니다.
        navigation.navigate('RecommendLanding'); // 실제로 사용할 스크린 이름으로 변경해야 합니다.
        setStep(1); // 스텝을 초기화합니다.
    }
  };

  return (
    <Container>
      {recipeData.length === 0 ? ( // recipeData가 비어있을 때 "로딩 중..." 표시
      <>
        <Dice />
        <LoadingText>로딩 중...</LoadingText>
        <ProgressBar />
      </>
        
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
  );
}

export default WorldcupScreen
