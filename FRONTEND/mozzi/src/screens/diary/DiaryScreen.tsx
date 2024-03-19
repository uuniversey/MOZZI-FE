import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Calendar, DateData } from 'react-native-calendars'

interface DayStyleProps {
  isSelected: boolean;
}

interface DayNumProps {
  textColor: string;
  isToday: boolean;
}

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
  align-items: center;
`

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin: 50px 0px 20px 40px;
  text-align: left;
  width: 100%;
`

const Btn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: black;
  border-radius: 28px;
  position: absolute;
  top: 65px;
  right: 100px;
`

const MyCalendar = styled(Calendar)`
  width: 370px;
  height: 590px;
  margin: 0px 20px 0px 20px;
`

const DayStyle = styled.View<DayStyleProps>`
  width: 50px;
  height: 65px;
  align-items: center;
  background-color: ${(props) => (props.isSelected ? '#c6e4ee' : 'transparent')};
`

const DayNum = styled.Text<DayNumProps>`
  align-items: center;
  color: ${props => props.textColor};
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
`

const CalendarImage = styled.Image`
  width: 95%;
  height: 95%;
  border-radius: 5px;
`

function DiaryScreen () {

  const navigation = useNavigation()

  const moveDiaryDetail = (date: Date) => {
    navigation.navigate("DiaryDetail", {date: date})
  }
  const moveDiaryCreate = () => {
    navigation.navigate("DiaryCreate")
  }

  return (
    <>
      <Container>
        <Title>나의 요리 달력</Title>
        <Btn onPress={moveDiaryCreate}>
          <Icon name="add" size={24} color="white" />
        </Btn>

        <MyCalendar
          dayComponent={({date, state}) => {
            let textColor = '#000' // 기본 텍스트 색상

            if (state === 'disabled') {
              textColor = '#d9e1e8' // 비활성화된 날짜(저번달/다음달 날짜)의 색상
            } else if (state === 'today') {
              textColor = 'red'
            }

            return (
              <TouchableOpacity onPress={() => moveDiaryDetail(date)}>
                <DayStyle isSelected={state === 'selected'}>
                  <DayNum textColor={textColor} isToday={state === 'today'}>
                    {date.day}
                  </DayNum>
                  {state !== 'disabled' && 
                    dummyfood.map((food) => {
                      return food.photoDate === date.dateString ? 
                      <CalendarImage
                      key={food.id}
                      source={{ uri: `${food.photoUrl}` }}
                    /> : null
                    })
                  }
                </DayStyle>
              </TouchableOpacity>
            )
          }}
        />
      </Container>
    </>
  )
}

export default DiaryScreen


const dummyfood = [
  { "id": 1,  "foodName": "김치 볶음밥" , "photoUrl" : 'https://i.namu.wiki/i/pspe5vjdPCZZ_5fKatNEzPXtxlNCXBViBW6clJIt0h8JkmTng-HrZ8oUTi5rsTeIM8QNkinpscMsxN_OVGFEe7Fli7g0WMkdjnSooiGRVnjG3K2oWN9hsUzLwl5Mk-E4Nd8xv1DTiS2cEbhSDU_2fQ.webp' , "photoDate" : "2024-03-05"},
  { "id": 2, "foodName": "떡볶이" , "photoUrl" : 'https://i.namu.wiki/i/0e2H0MymA2D0hthFVdH0MpUTxcVHLuAMaVv7mpWlyMHzxsFIaDkN1VRfX_nLLTlUde0t3sq97DIfteY0XrucKC7BnO4X4xtAVbC5O1TKYG0XTUXlOVMnbM7LdoBCiGkXqPT6qE1RuaaKqsrj5ojweQ.webp' , "photoDate" : "2024-03-11"},
  { "id": 3, "foodName": "갈비찜" , "photoUrl" : 'https://i.namu.wiki/i/tDfglDAem96NXwHVOFDTKYhqPLk2ZIP9UdFJvsjfdeUQjkmJYwRCgp6xlZy9r_APahob2Em7LZ0h5yI1CjM6UMxd1ME3HsILSE9OEQWpxR45VSEc-PwTvsjMWqSLf9qWubvPliRBE7cHLw9DkHLL1A.webp' , "photoDate" : "2024-03-13"},
  { "id": 4, "foodName": "피자" , "photoUrl" : 'https://i.namu.wiki/i/di644s1pVGwIOo7X51GPdl1d0-kXLv4QdHPx4-C-ctKT1zaeSwnsoU0cOYI-JIPg4rjzzQLbn7WQiiIZOnlUXTvKnl8W-FouxYPj5avKfMPqDylc6a7Grszr69IWjWO-83apv0-sEyp_eYgCAaBoLg.webp' , "photoDate" : "2024-03-22"},
  { "id": 5, "foodName": "뼈해장국" , "photoUrl" : 'https://i.namu.wiki/i/ywRdkOZAdp4dU3ItrNm36NjVx3sbEE6PYVvNVYpRa9MUDtKIxxejpM-jAXGl9fHGavoYESWtzbf7C0LA9RBGsS63D8KY1eINfE4ZQf-36gNq-fDtiJu9fXkS5hE01eY2ArhJcagnO7pMdtRz2e0dsA.webp' , "photoDate" : "2024-03-24"},
  { "id": 6, "foodName": "돈가스" , "photoUrl" : 'https://i.namu.wiki/i/870lvjrMKGTyx00arSIaji0nFXyrxh7C-8uMe4WA0k9mhlJUOnkRFz4r4w5411--p2I4Vl1TmDHjEWOJ5xpUladA9gGNBWJmJDR2kHavjNUGh6K3HVSbygWa3GsUMbjr0M755QOGtqS5Pc7M3LpXSg.webp' , "photoDate" : "2024-03-29"},
  { "id": 7, "foodName": "고등어구이" , "photoUrl" : 'https://i.namu.wiki/i/QncptNs6gl_Zyh-LEPsb_pEOkFhYKjvlOHUm0yNGp9iwCRUmUVjdJT9uxEEHIH6I0YW8BMq2YnvDlSV10wI3apuzbl_hDUpgH8KYCNFUqRc-E2s4JqnsVwWMqdHt26Kqsw3O4qSK9NLlvdjzOnk1Xw.webp' , "photoDate" : "2024-03-01"},
 ]