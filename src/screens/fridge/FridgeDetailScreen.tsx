import React, { useState, useRef, useEffect, FC } from 'react';
import { ScrollView, View, Keyboard, Platform, Text, Alert, TouchableOpacity, ImageSourcePropType, Image, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import FridgeOCR from './FridgeOCR';
import { Header } from '../../components/Header/Header';
import { SearchFood } from '../../components/AutoWord/SearchFood';
import useFridgeStore from '../../store/FridgeStore';

import note from '../../assets/fridge/note.png';
import clip from '../../assets/fridge/clip.png';


interface FoodItem {
  food: string;
}

interface FridgeDetailScreenProps {
  route: {
    params: {
      item: {
        name: string;
        img: ImageSourcePropType;
        storedPos: string;
      };
    };
  };
}


const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`;

const ClipImg = styled(Image)`
  position: absolute;
  top: 20;
  z-index: 1001;
`;

const NoteImg = styled(Image)`
  width: 98%;
  height: 400px;
  box-shadow: 5px 5px 5px gray;
`;

const Note = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 50px 16px 0 16px;
`;

const TitleContainer = styled(View)`
  position: absolute;
  top: 110;
  display: flex;
  align-items: center;
`;

const TitleImg = styled(Image)`
  display: inline;
  width: 30px;
  height: 30px;
`;

const MenuItem = styled(Text)`
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.palette.font};
  display: inline;
  font-size: 20px;
`;

const InputContainer = styled(View)`
  width: 100%;
  align-items: center;
  padding: 0 16px 0 16px;
`;

const MyFood = styled(ScrollView)`
  position: absolute;
  top: 200;
  width: 70%;
  height: 70%;
`;

const MyFoodText = styled(Text)`
  font-size: 20;
  font-family: ${(props) => props.theme.fonts.fridge};
`;

const DeleteButton = styled(TouchableOpacity)`
`;

const SendButton = styled(TouchableOpacity)`
  position: absolute;
  top: 22;
  right: 30;
  bottom: 0; 
`;


const FridgeDetailScreen: FC<FridgeDetailScreenProps> = ({ route }) => {
  const [text, setText] = useState<FoodItem | null>(null)
  const scrollViewRef = useRef<ScrollView | null>(null)
  const getMyFoods = useFridgeStore((state) => state.getMyFoods)
  const allFoods = useFridgeStore((state) => state.allFoods)
  const savedFoods = useFridgeStore((state) => state.savedFoods)
  const addFridge = useFridgeStore((state) => state.addFridge)
  const deleteFood = useFridgeStore((state) => state.deleteFood)
  const [keyboardOpen, setKeyboardOpen] = useState(false) // 키보드 상태를 추적하는 상태 변수 추가

  const { item } = route.params
  const { name, img , storedPos } = item

  const navigation = useNavigation<NavigationProp<any>>()


  useEffect(() => {
    // console.log(`저장된 위치: ${storedPos}`)
    getMyFoods(storedPos)
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOpen(true) // 키보드가 열리면 keyboardOpen을 true로 설정
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOpen(false) // 키보드가 닫히면 keyboardOpen을 false로 설정
    });

    return () => {
      useFridgeStore.getState().resetSavedFoods()
      showSubscription.remove()
      hideSubscription.remove()
    };
  }, [getMyFoods, route.params])


  const handleSend = () => {
    // allFoods 내에서 text 문자열이 존재하는지 확인
    const isIngredientInList = allFoods.includes(text);
  
    if (text && isIngredientInList) {
      addFridge(text, storedPos) // Zustand 스토어 업데이트 및 DB 업데이트
      setText('') // 텍스트 입력 필드 초기화
      Keyboard.dismiss() // 키보드를 닫음
      scrollViewRef.current?.scrollToEnd({ animated: true }) // 스크롤을 맨 아래로 이동
    } else {
      // 식재료가 목록에 없을 경우 경고 메시지 표시
      Alert.alert("알림", "모찌가 알지 못하는 식재료예요!\n정확한 식재료 이름을 입력해 주세요.")
    }
  }


  const handleDelete = async (foodName: string) => {
    await deleteFood(foodName)
    getMyFoods(storedPos)
  }


  // OCR 관련
  const handleOcrResult = (ocrText: string) => {
    setText({ food: ocrText })
  }


  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header>
        <Header.Icon iconName="arrow-back" onPress={navigation.goBack} />
      </Header>

      {!keyboardOpen && ( // 키보드가 열려있지 않을 때만 노트와 그 내용을 렌더링
        <Note>
          <ClipImg source={clip} />
          <NoteImg source={note} />
          <TitleContainer>
            {img && <TitleImg source={img} />}
            <MenuItem>
              {name}
            </MenuItem>
          </TitleContainer>
          <MyFood 
            contentContainerStyle={{
              justifyContent: 'center', // 세로 방향으로 중앙 정렬
              alignItems: 'center', // 가로 방향으로 중앙 정렬
            }}
            ref={scrollViewRef}
          >
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

      {/* 키보드가 열릴 때만 OCR 기능 활성화 버튼을 표시 */}
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
  )
}


export default FridgeDetailScreen
