import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styled from 'styled-components/native'

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

const Btn = styled.TouchableOpacity`
  background-color: #F9F7BB;
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
  align-self: flex-end;
`

const BtnText = styled.Text`
  font-size: 16px;
  text-align: center;
`

function ProfileScreen () {

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

  const editProfile = () => {
    console.log('Form Data:', form)
  }

  return (
    <>
      <Container>
        <Title>내 정보</Title>
        <Body>
          <Label>이메일</Label>
          <StyledInput
            placeholder="이메일을 입력하세요"
            value={form.email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Label>알레르기 정보</Label>
          <StyledInput
            placeholder="알레르기 정보를 입력하세요"
            value={form.allergyInfo}
            onChangeText={handleAllergyInfoChange}
          />
          <Label>좋아하는 음식</Label>
          <StyledInput
            placeholder="좋아하는 음식을 입력하세요"
            value={form.favoriteFood}
            onChangeText={handleFavoriteFoodChange}
          />
          <Label>싫어하는 음식</Label>
          <StyledInput
            placeholder="싫어하는 음식을 입력하세요"
            value={form.dislikedFood}
            onChangeText={handleDislikedFoodChange}
          />
          <Label>비건 여부</Label>
          <StyledInput
            placeholder="예/아니오로 입력하세요"
            value={form.isVegan}
            onChangeText={handleIsVeganChange}
          />
          <Btn onPress={editProfile}>
            <BtnText>수정</BtnText>
          </Btn>
        </Body>
      </Container>
    </>
  )
}

export default ProfileScreen