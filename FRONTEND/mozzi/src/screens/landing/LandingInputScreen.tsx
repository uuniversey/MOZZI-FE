import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styled from 'styled-components/native'
import Allergy from '../../components/Dropdown/Allergy'

import { useNavigation } from '@react-navigation/native'
import useProfileStore from '../../store/ProfileStore'
import useLoginStore from '../../store/LoginStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserProfileState {
  email: string
  allergyInfo: string
  favoriteFood: string
  dislikedFood: string
  isVegan: string
}

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
`

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin: 50px 0px 0px 40px;
  text-align: left;
  width: 100%;
`

const BgText = styled.Text`
  background-color: #F9F7BB;
  font-size: 18px;
`

const Body = styled.View`
  margin: 0px 40px 0px 40px;
`

const Label = styled.Text`
  margin-top: 30px;
`

const StyledInput = styled.TextInput`
  height: 40px;
  margin: 10px 0px 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: silver;
`

const StyledView = styled.View`
  height: auto;
  margin: 10px 0px 10px 0px;
`

const JustifyView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`

const Btn = styled.TouchableOpacity`
  background-color: #F9F7BB;
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
  align-self: flex-end;
  margin-top: 30px;
`

const BtnText = styled.Text`
  font-size: 16px;
  text-align: center;
`

function ProfileScreen () {
  const { settingProfile } = useProfileStore()
  const { setIsLogin, userData } = useLoginStore()

  const [form, setForm] = useState<UserProfileState>({
    email: '',
    allergyInfo: '',
    favoriteFood: '',
    dislikedFood: '',
    isVegan: ''
  })

  const handleEmailChange = (email: string) => setForm({ ...form, email })
  const handleAllergyInfoChange = (allergyInfo: string) => setForm({ ...form, allergyInfo })
  const handleFavoriteFoodChange = (favoriteFood: string) => setForm({ ...form, favoriteFood })
  const handleDislikedFoodChange = (dislikedFood: string) => setForm({ ...form, dislikedFood })
  const handleIsVeganChange = (isVegan: string) => setForm({ ...form, isVegan })

  const goMain = () => {
    setIsLogin(true)
  }

  const completeEnter = () => {
    settingProfile()
  }

  useEffect(() => {
    console.log('내가담은데이터', userData)
    
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      console.log('accessToken:', accessToken)
    })
  }, [])

  return (
    <Container>
      <Title>회원 정보 입력</Title>
      <Body>
        <Label>닉네임</Label>
        <StyledInput
          placeholder="닉네임을 입력하세요"
          value={form.email}
          onChangeText={handleEmailChange}
          placeholderTextColor="#ccc"
        />

        <BgText>모찌가 레시피를 잘 추천할 수 있도록 아래의 추가 정보를 입력해 주세요!</BgText>
        
        <Label>알레르기 정보</Label>
        <StyledView>
          <Allergy />
        </StyledView>

        <Label>좋아하는 음식</Label>
        <StyledInput
          placeholder="좋아하는 음식을 입력하세요"
          value={form.favoriteFood}
          onChangeText={handleFavoriteFoodChange}
          placeholderTextColor="#ccc"
        />

        <Label>싫어하는 음식</Label>
        <StyledInput
          placeholder="싫어하는 음식을 입력하세요"
          value={form.dislikedFood}
          onChangeText={handleDislikedFoodChange}
          placeholderTextColor="#ccc"
        />

        <Label>비건 여부</Label>
        <StyledInput
          placeholder="예/아니오로 입력하세요"
          value={form.isVegan}
          onChangeText={handleIsVeganChange}
          placeholderTextColor="#ccc"
        />

        <JustifyView>
          <Btn onPress={goMain}>
            <BtnText>스킵</BtnText>
          </Btn>

          <Btn onPress={completeEnter}>
            <BtnText>완료</BtnText>
          </Btn>
        </JustifyView>
      </Body>
    </Container>
  )
}

export default ProfileScreen