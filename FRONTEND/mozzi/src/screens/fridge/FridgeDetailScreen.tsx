import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import styled from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useFridgeStore from '../../store/FridgeStore'
import note from '../../assets/fridge/note.png'
import clip from '../../assets/fridge/clip.png'

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #FFFEF2;
  /* justify-content: center; */
`;

const Title = styled.Text`
  margin-top: 50px;
  margin-bottom: 20px;
`

const ClipImg = styled.Image`
  position: absolute;
  top: 20;
  z-index: 1001;
`

const NoteImg = styled.Image`
  height: ${({ keyboardOpen }) => (keyboardOpen ? '300px' : '460px')}; /* 키보드가 열렸을 때 이미지 높이 조절 */
  box-shadow: 5px 5px 5px gray;
`;

const Note = styled.View`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const TitleContainer = styled.View`
  position: absolute;
  top: 110;
  display: flex;
  align-items: center;
`

const TitleImg = styled.Image`
  display: inline;
  width: 30px;
  height: 30px;
`

const MenuItem = styled.Text`
  display: inline;
  font-size: 12px;
`

const InputContainer = styled.View`
  margin-top: 30px;
  width: 100%; 
  align-items: center; 
`;

const MyFood = styled.ScrollView`
  position: absolute;
  top: 170;
  width: 280px;
  height: 300px;
`

const MyFoodText = styled.Text`
  font-size: 20;
`

const InputFood = styled.TextInput`
  width: 100%; 
  max-width: 350px; 
  border-width: 2px;
  border-color: #E4E196;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: white;
  position: relative;
`;

const SendButton = styled.TouchableOpacity`
  position: absolute;
  top: 12;
  right: 32;
  bottom: 0;
  padding: 0 10px; /* 전송 버튼의 패딩 설정 */
`;

const AutoWord = styled.View`
`

const MiniTitleContainer = styled.View`
  width: 350px;
  align-self: center;
`;

const MiniTitle = styled.Text`
  font-size: 12;
  margin-top: 20px;
  align-self: flex-start;
`

function FridgeDetailScreen({ route }) {
  const [text, setText] = useState('')
  const scrollViewRef = useRef(null)
  const savedTexts = useFridgeStore((state) => state.savedTexts)
  const addFridge = useFridgeStore((state) => state.addFridge)
  
  const { item } = route.params; // item을 받음
  const { name, img } = item;

  const navigation = useNavigation()

  // const handleSend = () => {
  //   // 전송 버튼을 눌렀을 때 텍스트 상태 초기화 및 위치 조정
  //   setSavedText(savedText + text + '\n');
  //   setText('');
  //   scrollViewRef.current.scrollToEnd({ animated: true });
  // }

  const handleSend = () => {
    addFridge(text); // Zustand 스토어 업데이트 및 DB 업데이트
    setText(''); // 텍스트 입력 필드 초기화
    scrollViewRef.current.scrollToEnd({ animated: true }); // 스크롤을 맨 아래로 이동
  };
  
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Header>
          <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
        </Header>
      
      <Note>
        <ClipImg source={clip} />
        <NoteImg source={note} />
        <TitleContainer>
          {img && <TitleImg source={img} />}
          <MenuItem>{name}</MenuItem>
        </TitleContainer>
        <MyFood ref={scrollViewRef}>
          {savedTexts.map((item, index) => ( // 배열을 순회하며 MyFoodText 컴포넌트로 렌더링
            <MyFoodText key={index}>{item}</MyFoodText>
          ))}
        </MyFood>
      </Note>

      <InputContainer>
        <InputFood
          onChangeText={setText}
          value={text}
          placeholder="재료를 입력해 주세요..."
        />
        {text.length > 0 && ( // 텍스트가 있을 때만 전송 버튼 표시
          <SendButton 
            onPress={handleSend}
          >
            <MaterialIcons 
              name="arrow-upward"
              size={25}
            />
          </SendButton>
        )}
        
        <MiniTitleContainer>
          <MiniTitle>추천 검색어</MiniTitle>
        </MiniTitleContainer>
        <AutoWord></AutoWord>
      </InputContainer>
      
    </Container>
  )
}

export default FridgeDetailScreen