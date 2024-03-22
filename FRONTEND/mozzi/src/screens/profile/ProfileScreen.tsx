import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styled from 'styled-components/native'

import EditScreen from './EditScreen'
import useProfileStore from '../../store/ProfileStore'

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
  margin-top: 30px;
`

const BtnText = styled.Text`
  font-size: 16px;
  text-align: center;
`

function ProfileScreen () {
  const { getProfile, profileData, editNickname } = useProfileStore()
  const [ isEdit, setIsEdit ] = useState<boolean>(false)

  useEffect (() => {
    getProfile()
  }, [])

  const handleIsEdit = () => {
    if (isEdit) {
      editNickname('신그자체김상범')
    }
    setIsEdit(!isEdit)
  }

  return (
    <Container>
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
            />
            <Label>좋아하는 음식</Label>
            <StyledInput
              placeholder={`${profileData.foods}`}
            />
            <Label>싫어하는 음식</Label>
            <StyledInput
              placeholder={`${profileData.foods}`}
            />
            <Label>비건 여부</Label>
            <StyledInput
              placeholder={`${profileData.isVegan}`}
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