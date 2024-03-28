import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header/Header'

import EditScreen from './EditScreen'
import useProfileStore from '../../store/ProfileStore'


interface UserProfileState {
  nickname: string
  allergyInfo: string
  favoriteFood: string
  dislikedFood: string
  isVegan: string
}

const Container = styled(View)`
  flex: 1;
  background-color: #FFFEF2;
`

const Title = styled(Text)`
  font-size: 36px;
  font-weight: bold;
  margin: 20px 0px 0px 40px;
  text-align: left;
  width: 100%;
  font-family: ${(props) => props.theme.fonts.title};
`

const Body = styled(View)`
  margin: 0px 40px 0px 40px;
`

const Label = styled(Text)`
  margin-top: 30px;
  font-family: ${(props) => props.theme.fonts.content};
`

const StyledInput = styled(TextInput)`
  height: 40px;
  margin: 10px 0px 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: silver;
`

const Btn = styled(TouchableOpacity)`
  background-color: #F9F7BB;
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
`

function ProfileScreen () {
  const navigation = useNavigation()
  const { getProfile, profileData, editNickname, editIsVegan, editFoodInfo, form } = useProfileStore()
  const [ isEdit, setIsEdit ] = useState<boolean>(false)
  const [ foodInfo, setFoodInfo ] = useState(
  [
    { foodName : "당근",
      "value" : 1},
    { foodName : "토마토",
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
      console.log('this is form', form)
      // 입력 값으로 바꿔야 함
      editNickname(form.nickname)
      editIsVegan(Boolean(form.isVegan))
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
              placeholder={`${form.nickname}`}
              editable={false}
            />
            <Label>알레르기 정보</Label>
            <StyledInput
              placeholder={`${form.foods}`}
              editable={false}
            />
            <Label>좋아하는 음식</Label>
            <StyledInput
              placeholder={`${form.foods}`}
              editable={false}
            />
            <Label>싫어하는 음식</Label>
            <StyledInput
              placeholder={`${form.foods}`}
              editable={false}
            />
            <Label>비건 여부</Label>
            <StyledInput
              placeholder={`${form.isVegan == 0 ? '네':'아니오'}`}
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