import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styled from 'styled-components/native'
import CustomDropdown from '../../components/Dropdown/CustomDropdown'

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

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`

const Title = styled(Text)`
  font-size: 36px;
  margin: 50px 0px 0px 40px;
  text-align: left;
  width: 100%;
  font-family: ${(props) => props.theme.fonts.content};
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

const StyledView = styled(View)`
  height: auto;
  margin: 10px 0px 10px 0px;
`

const JustifyView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`

const Btn = styled(TouchableOpacity)`
  background-color: #${(props) => props.theme.palette.point};
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
    console.log('여기에 엑시오스 넣어라')
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
        <CustomDropdown
          data={allergyList}
          placeholder="보유하고 있는 알레르기 정보를 선택해 주세요"
          isMulti={true}
        />
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

const allergyList = [
  { label: '난류', value: 'egg' },
  { label: '우유', value: 'milk' },
  { label: '메밀', value: 'buckwheat' },
  { label: '땅콩', value: 'peanut' },
  { label: '대두', value: 'soy' },
  { label: '밀', value: 'wheat' },
  { label: '고등어', value: 'mackerel' },
  { label: '새우', value: 'shrimp' },
  { label: '게', value: 'crab' },
  { label: '돼지고기', value: 'pork' },
  { label: '복숭아', value: 'peach' },
  { label: '토마토', value: 'tomato' },
  { label: '아황산류', value: 'sulfites' },
  { label: '호두', value: 'walnut' },
  { label: '닭고기', value: 'chicken' },
  { label: '쇠고기', value: 'beef' },
  { label: '오징어', value: 'squid' },
  { label: '굴', value: 'oyster' },
  { label: '전복', value: 'abalone' },
  { label: '홍합', value: 'mussel' },
  { label: '잣', value: 'pine_nut' }
]