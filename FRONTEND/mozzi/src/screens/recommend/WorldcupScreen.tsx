import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../components/Header/Header'
import useRecipeStore from '../../store/RecipeStore'
import LoadingScreen from '../../components/Loading/LoadingScreen'

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
  /* border: 1px solid ${(props) => props.theme.palette.pointDark}; */
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
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const { getWorldcupRecipe, worldcupData, updatePreferences } = useRecipeStore();
  const [currentChoices, setCurrentChoices] = useState([]);

  useEffect(() => {
    getWorldcupRecipe();
  }, []);

  useEffect(() => {
    console.log('Worldcup data updated:', worldcupData);
  }, [worldcupData]);

  useEffect(() => {
    if (worldcupData && Array.isArray(worldcupData) && worldcupData.length > 0) {
      const foodNames = worldcupData[0].foodName;
      const photos = worldcupData[0].photo;
      const allPairs = [];
  
      for (let i = 0; i < foodNames.length; i += 2) {
        allPairs.push([
          { foodName: foodNames[i], photoUrl: photos[i] },
          { foodName: foodNames[i + 1], photoUrl: photos[i + 1] }
        ]);
      }
  
      setCurrentChoices(allPairs); // 여기서는 모든 스텝의 데이터를 설정합니다.
    }
  }, [worldcupData]);


  const handleChoice = async (selectedChoice) => {
    const nonSelectedChoices = currentChoices[step - 1].filter(choice => choice.foodName !== selectedChoice.foodName);
    const foodPreferences = nonSelectedChoices.map(choice => ({ foodName: choice.foodName, value: -1 }));
    foodPreferences.push({ foodName: selectedChoice.foodName, value: 1 });

    console.log('음식 선호도 업데이트:', foodPreferences);

    await updatePreferences(foodPreferences);

    if (step < 3) {
      setStep(step + 1); // 다음 단계로 이동합니다.
    } else {
      navigation.navigate('RecommendLanding'); // 마지막 단계이면 결과 페이지로 이동합니다.
      setStep(1); // 스텝을 초기화합니다.
    }
  };


  return (
    <Container>
      {worldcupData && worldcupData.length === 0 ? ( // worldcupData가 정의되어 있는지와 비어 있는지 확인
        <LoadingScreen 
          dataLength={worldcupData.length}
        />
      ) : (
        <>
          <TextContainer>
            <Question>어떤 음식을 선호하시나요?</Question>
            <Text>({step}/3)</Text>          
          </TextContainer>
          <ChoiceContainer>
            {currentChoices[step - 1]?.map((choice, index) => (
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
