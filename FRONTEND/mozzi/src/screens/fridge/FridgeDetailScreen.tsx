import React, { useState, useRef, useEffect } from 'react';
import { Keyboard, Platform, Text } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header/Header';
import { SearchFood } from '../../components/AutoWord/SearchFood';
import useFridgeStore from '../../store/FridgeStore';
import note from '../../assets/fridge/note.png';
import clip from '../../assets/fridge/clip.png';

interface FoodItem {
  food: string;
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #FFFEF2;
`;

const ClipImg = styled.Image`
  position: absolute;
  top: 20;
  z-index: 1001;
`;

const NoteImg = styled.Image`
  height: ${({ keyboardOpen }) => (keyboardOpen ? '300px' : '460px')};
  box-shadow: 5px 5px 5px gray;
`;

const Note = styled.View`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TitleContainer = styled.View`
  position: absolute;
  top: 110;
  display: flex;
  align-items: center;
`;

const TitleImg = styled.Image`
  display: inline;
  width: 30px;
  height: 30px;
`;

const MenuItem = styled(Text)`
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.palette.main};
  display: inline;
  font-size: 20px;
`;

const InputContainer = styled.View`
margin-top: ${({ keyboardOpen }) => (keyboardOpen ? '200px' : '30px')};
  /* margin-top: ${({ keyboardOpen }) => (keyboardOpen ? '200px' : '30px')}; */
  width: 100%;
  align-items: center;
`;

const MyFood = styled.ScrollView`
  position: absolute;
  top: 200;
  width: 280px;
  height: 280px;
`;

const MyFoodText = styled(Text)`
  font-size: 20;
  font-family: ${(props) => props.theme.fonts.fridge};
  /* color: ${(props) => props.theme.palette.main}; */
`;

const DeleteButton = styled.TouchableOpacity`
  /* color: lightgray; */
`;

const SendButton = styled.TouchableOpacity`
  position: absolute;
  top: 12;
  right: 32;
  bottom: 0;
  padding: 0 10px;
`; 

const FridgeDetailScreen = ({ route }) => {
  const [text, setText] = useState<FoodItem | null>(null);
  const scrollViewRef = useRef(null);
  const getMyFoods = useFridgeStore((state) => state.getMyFoods);
  const allFoods = useFridgeStore((state) => state.allFoods);
  const savedFoods = useFridgeStore((state) => state.savedFoods);
  const addFridge = useFridgeStore((state) => state.addFridge);
  const deleteFood = useFridgeStore((state) => state.deleteFood);
  const [keyboardOpen, setKeyboardOpen] = useState(false); // 키보드 상태를 추적하는 상태 변수 추가

  const { item } = route.params;
  const { name, img , storedPos } = item;

  const navigation = useNavigation();

  useEffect(() => {
    console.log(`저장된 위치: ${storedPos}`);
    getMyFoods(storedPos)
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOpen(true); // 키보드가 열리면 keyboardOpen을 true로 설정
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOpen(false); // 키보드가 닫히면 keyboardOpen을 false로 설정
    });

    return () => {
      useFridgeStore.getState().resetSavedFoods();
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [getMyFoods, route.params]);

  const handleSend = () => {
    if (text) {
      addFridge(text, storedPos); // Zustand 스토어 업데이트 및 DB 업데이트
      setText(null); // 텍스트 입력 필드 초기화
      Keyboard.dismiss(); // 키보드를 닫음
      scrollViewRef.current?.scrollToEnd({ animated: true }); // 스크롤을 맨 아래로 이동
    }
  };

  const handleDelete = async (foodName) => {
    await deleteFood(foodName);
    getMyFoods(storedPos);
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>

      {!keyboardOpen && ( // 키보드가 열려있지 않을 때만 노트와 그 내용을 렌더링
        <Note>
          <ClipImg source={clip} />
          <NoteImg source={note} keyboardOpen={keyboardOpen}/>
          <TitleContainer>
            {img && <TitleImg source={img} />}
            <MenuItem>
              {name}
            </MenuItem>
          </TitleContainer>
          <MyFood ref={scrollViewRef}>
            {savedFoods.map((item, index) => (
              <MyFoodText key={index}>
                {item.foodName}
                <DeleteButton onPress={() => handleDelete(item.foodName)}>
                  <MaterialIcons name="close" size={20} />
                </DeleteButton>
              </MyFoodText>
            ))}
          </MyFood>
        </Note>
      )}

      <InputContainer>
        <SearchFood
          data={allFoods}
          setQuery={setText}
          placeholder="재료를 입력하세요..."
        />
        {text && (
          <SendButton onPress={handleSend}>
            <MaterialIcons name="arrow-upward" size={25} />
          </SendButton>
        )}
      </InputContainer>
    </Container>
  );
};

export default FridgeDetailScreen;
