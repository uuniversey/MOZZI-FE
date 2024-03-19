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

const P = styled.Text`
  margin: 30px 0px 30px 0px;
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

  const editProfile = () => {
    console.log('Form Data:', form)
  }

  return (
    <>
      <Container>
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
          <Btn onPress={editProfile}>
            <BtnText>수정</BtnText>
          </Btn>
        </View>
      </Container>
    </>
  )
}

export default LandingInputScreen