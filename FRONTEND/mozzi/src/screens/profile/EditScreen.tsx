import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styled from 'styled-components/native'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import { SearchBar } from '../../components/AutoWord/SearchLike'

import useProfileStore from '../../store/ProfileStore'
import useFridgeStore from '../../store/FridgeStore'

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

function EditScreen() {
  const { profileData, form, setForm } = useProfileStore()
  const { allFoods } = useFridgeStore()

  const [text, setText] = useState('')

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
      <CustomDropdown
        data={allergyList}
        placeholder="보유하고 있는 알레르기 정보를 선택해 주세요"
        isMulti={true}
      />

      <Label>좋아하는 식재료</Label>
      {/* <SearchLike></SearchLike> */}
      {/* <CustomDropdown
        data={allFoods}
        placeholder="좋아하는 식재료를 입력하세요" 
        isMulti={true}
      /> */}

      <Label>싫어하는 식재료</Label>
      {/* <CustomDropdown
        data={allFoods}
        placeholder="싫어하는 식재료를 입력하세요"
        isMulti={true}
      /> */}

      <Label>비건 여부</Label>
      <CustomDropdown
        data={isYes}
        placeholder="비건 여부를 알려주세요"
        isMulti={false}
      />
    </View>
  )
}

export default EditScreen

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
  { label: '호두', value: 'walnut' },
  { label: '닭고기', value: 'chicken' },
  { label: '쇠고기', value: 'beef' },
  { label: '오징어', value: 'squid' },
  { label: '굴', value: 'oyster' },
  { label: '전복', value: 'abalone' },
  { label: '홍합', value: 'mussel' },
  { label: '잣', value: 'pine_nut' }
]

const isYes = [
  {label:'Yes', value: true},
  {label:'No', value: false}
]