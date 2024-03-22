import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styled from 'styled-components/native'

interface UserProfileState {
  nickname: string
  allergyInfo: string
  favoriteFood: string
  dislikedFood: string
  isVegan: string
}

const Label = styled.Text`
  margin-top: 30px;
`

const StyledInput = styled.TextInput`
  height: 40px;
  margin: 10px 0px 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: silver;
`

function EditScreen() {
  const [form, setForm] = useState<UserProfileState>({
    nickname: '',
    allergyInfo: '',
    favoriteFood: '',
    dislikedFood: '',
    isVegan: ''
  })

  const handleNicknameChange = (nickname: string) => setForm({ ...form, nickname })
  const handleAllergyInfoChange = (allergyInfo: string) => setForm({ ...form, allergyInfo })
  const handleFavoriteFoodChange = (favoriteFood: string) => setForm({ ...form, favoriteFood })
  const handleDislikedFoodChange = (dislikedFood: string) => setForm({ ...form, dislikedFood })
  const handleIsVeganChange = (isVegan: string) => setForm({ ...form, isVegan })

  return (
    <View>
      <Label>닉네임</Label>
      <StyledInput
        placeholder="닉네임을 입력하세요"
        value={form.nickname}
        onChangeText={handleNicknameChange}
        placeholderTextColor="#ccc"
      />
      <Label>알레르기 정보</Label>
      <StyledInput
        placeholder="알레르기 정보를 입력하세요"
        value={form.allergyInfo}
        onChangeText={handleAllergyInfoChange}
        placeholderTextColor="#ccc"
      />
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
    </View>
  )
}

export default EditScreen