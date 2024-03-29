import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header/Header'

import EditScreen from './EditScreen'
import useProfileStore from '../../store/ProfileStore'
import useDropdownStore from '../../store/DropdownStore'


interface UserProfileState {
  nickname: string
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
  margin: 20px 0px 0px 40px;
  text-align: left;
  width: 100%;
  font-family: ${(props) => props.theme.fonts.title};
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

function ProfileScreen () {
  const navigation = useNavigation()
  const { getProfile, profileData, editNickname, editIsVegan, editFoodInfo, form } = useProfileStore()
  const { dropdownData } = useDropdownStore()
  const [ isEdit, setIsEdit ] = useState<boolean>(false)
  const [ foodInfo, setFoodInfo ] = useState(
  [
    { foodName : "파마산치즈",
      "value" : 1},
    { foodName : "고추",
      "value" : 0},
    { foodName : "우유",
      "value" : 2},
  ]
)

  useLayoutEffect (() => {
    getProfile()
  }, [isEdit])
 
  const handleIsEdit = () => {
    if (isEdit) {
      editNickname(form.nickname)
      editIsVegan(Boolean(dropdownData))
      editFoodInfo(foodInfo)
    }
    setIsEdit(!isEdit)
  }

  return (
    <Container>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>

      <Title>내 정보</Title>
      <Body>
        {isEdit ? (
          <EditScreen />
          ) : (
          <View>
            <Label>닉네임</Label>
            <StyledInput
              placeholder={`${profileData.nickname}`}
              editable={false}
            />
            <Label>알레르기 정보</Label>
            <StyledInput
              placeholder={`${profileData.foods}`}
              editable={false}
            />
            <Label>좋아하는 식재료</Label>
            <StyledInput
              placeholder={`${profileData.foods}`}
              editable={false}
            />
            <Label>싫어하는 식재료</Label>
            <StyledInput
              placeholder={`${profileData.foods}`}
              editable={false}
            />
            <Label>비건 여부</Label>
            <StyledInput
              placeholder={`${(profileData.isVegan)? '네':'아니오'}`}
              editable={false}
            />
          </View>
          )
        }
        <Btn onPress={handleIsEdit}>
          <BtnText>{isEdit ? '완료' : '수정'}</BtnText>
        </Btn>
      </Body>
    </Container>
  )
}

export default ProfileScreen