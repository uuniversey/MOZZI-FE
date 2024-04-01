import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import { SearchBar } from '../../components/AutoWord/SearchLike'

import useProfileStore from '../../store/ProfileStore'
import useRecipeStore from '../../store/RecipeStore'
import useDropdownStore from '../../store/DropdownStore'
import useLoginStore from '../../store/LoginStore'

import AsyncStorage from '@react-native-async-storage/async-storage'

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`

const Title = styled(Text)`
  font-size: 36px;
  margin: 20px 0px 0px 40px;
  text-align: left;
  width: 100%;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.palette.font}; 
`

const BgText = styled(Text)`
  background-color: ${(props) => props.theme.palette.point};
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font}; 
`

const Body = styled(View)`
  margin: 0px 40px 0px 40px;
`

const Label = styled(Text)`
  margin-top: 30px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font}; 
`

const StyledInput = styled(TextInput)`
  height: 40px;
  margin: 10px 0px 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: silver;
`

const JustifyView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`

const Btn = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
  align-self: flex-end;
  margin-top: 30px;
`

const BtnText = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

function InputScreen () {
  const { setIsLogin, userData } = useLoginStore()
  const { profileData, form, setForm, foodInfo, setFoodInfo, editNickname, editIsVegan, editFoodInfo } = useProfileStore()
  const { ingredientData, getIngredient } = useRecipeStore()
  const { dropdownData, isVeganData } = useDropdownStore()

  const [ likeData, setLikeData ] = useState([])
  const [ unlikeData, setUnlikeData ] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      console.log('accessToken:', accessToken)
    })
  }, [])
  
  useEffect(() => {
    const formatData = (data, value) => 
    Array.isArray(data) ? data.map(foodName => ({ foodName, value })) : []
    
    const formattedData = [
      ...formatData(unlikeData, 0),
      ...formatData(likeData, 1),
      ...formatData(dropdownData, 2),
    ]
    
    console.log( '알러지/호불호 식재료 데이터 완성', formattedData)
    setFoodInfo(formattedData)
    
  }, [unlikeData, likeData, dropdownData])
  
  // 스킵 버튼 클릭시
  const goMain = () => {
    setIsLogin(true)
  }
  
  // 완료 버튼 클릭시
  const completeInput = () => {
    editNickname(form.nickname)
    editIsVegan(Boolean(isVeganData))
    editFoodInfo(foodInfo)
    
    setIsLogin(true)
  }
  

  const handleLikeData = (recipeName: string) => {
    console.log('좋아하는 재료', recipeName)
    setLikeData(recipeName)
  }

  const handleUnlikeData = (recipeName: string) => {
    console.log('싫어하는 재료', recipeName)
    setUnlikeData(recipeName)
  }

  const handleNicknameChange = (nickname: string) => setForm({ ...form, nickname })

  return (
    <Container>
      <Title>회원 정보 입력</Title>
      <KeyboardAvoidingView>
        <Body>
          <Label>닉네임</Label>
          <StyledInput
            placeholder="닉네임을 입력하세요"
            value={form.nickname}
            onChangeText={handleNicknameChange}
            placeholderTextColor="#ccc"
          />

          <BgText>모찌가 레시피를 잘 추천할 수 있도록 아래의 추가 정보를 입력해 주세요!</BgText>
          
          <Label>알레르기 정보</Label>
          <CustomDropdown
            data={allergyList}
            placeholder="보유하고 있는 알레르기 정보를 선택해 주세요"
            isMulti={true}
          />

          <Label>좋아하는 식재료</Label>
          <SearchBar data={ingredientData} onSelect={handleLikeData} flag={1}/>

          <Label>싫어하는 식재료</Label>
          <SearchBar data={ingredientData} onSelect={handleUnlikeData} flag={0}/>

          <Label>비건 여부</Label>
          <CustomDropdown
            data={isYes}
            placeholder="비건 여부를 알려주세요"
            isMulti={false}
          />

          <JustifyView>
            <Btn onPress={goMain}>
              <BtnText>스킵</BtnText>
            </Btn>

            <Btn onPress={completeInput}>
              <BtnText>완료</BtnText>
            </Btn>
          </JustifyView>
        </Body>
      </KeyboardAvoidingView>
    </Container>
  )
}

export default InputScreen

// 이 밑에 더미데이터 아님 절대 지우면 안돼
const allergyList = [
  { label: '난류', value: '난류' },
  { label: '우유', value: '우유' },
  { label: '메밀', value: '메밀' },
  { label: '땅콩', value: '땅콩' },
  { label: '대두', value: '대두' },
  { label: '밀', value: '밀' },
  { label: '고등어', value: '고등어' },
  { label: '새우', value: '새우' },
  { label: '게', value: '게' },
  { label: '돼지고기', value: '돼지고기' },
  { label: '복숭아', value: '복숭아' },
  { label: '토마토', value: '토마토' },
  { label: '호두', value: '호두' },
  { label: '닭고기', value: '닭고기' },
  { label: '쇠고기', value: '쇠고기' },
  { label: '오징어', value: '오징어' },
  { label: '굴', value: '굴' },
  { label: '전복', value: '전복' },
  { label: '홍합', value: '홍합' },
  { label: '잣', value: '잣' }
]

const isYes = [
  {label:'Yes', value: true},
  {label:'No', value: false}
]