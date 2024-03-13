import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import styled from 'styled-components/native'

interface UserProfileState {
  email: string
  allergyInfo: string
  favoriteFood: string
  dislikedFood: string
  isVegan: string
}

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin-top: 50px;
  text-align: left;
  width: 100%;
`

const Label = styled.Text`
  margin-top: 30px;
`

const P = styled.Text`
  margin: 30px 0px 30px 0px;
`

const StyledInput = styled.TextInput`
  height: 40px;
  margin: 12px;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: silver;

`

function LandingInputScreen() {
  const [form, setForm] = useState<UserProfileState>({
    email: '',
    allergyInfo: '',
    favoriteFood: '',
    dislikedFood: '',
    isVegan: ''
  })

  const handleNicknameChange = (email: string) => setForm({ ...form, email })
  const handleAllergyInfoChange = (allergyInfo: string) => setForm({ ...form, allergyInfo })
  const handleFavoriteFoodChange = (favoriteFood: string) => setForm({ ...form, favoriteFood })
  const handleDislikedFoodChange = (dislikedFood: string) => setForm({ ...form, dislikedFood })
  const handleIsVeganChange = (isVegan: string) => setForm({ ...form, isVegan })

  const handleSubmit = () => {
    console.log('Form Data:', form)
  }

  return (
    <>
      <Title>회원 정보 입력</Title>
      <View>
        <Label>닉네임</Label>
        <StyledInput
          placeholder="닉네임을 입력하세요"
          value={form.email}
          onChangeText={handleNicknameChange}
        />
        <P>모찌가 레시피를 잘 추천할 수 있도록 아래의 추가 정보를 입력해 주세요!</P>
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
        <Button title="완료" onPress={handleSubmit} />
      </View>
    </>
  )
}

export default LandingInputScreen