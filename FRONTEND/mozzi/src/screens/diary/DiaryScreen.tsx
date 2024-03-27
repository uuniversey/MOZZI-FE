import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Calendar } from 'react-native-calendars'

import useDiaryStore from '../../store/DiaryStore'

interface DayStyleProps {
  isSelected: boolean;
}

interface DayNumProps {
  textColor: string;
  isToday: boolean;
}

const Container = styled(View)`
  flex: 1;
  background-color: #FFFEF2;

`

const JustifyView = styled(View)`
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 50px 0px 20px 40px;
`

const BtnContainer = styled(View)`
  margin-top: 10px;
  margin-left: 20px;
`

const Title = styled(Text)`
  font-size: 36px;
  font-weight: bold;
  text-align: left;
  font-family: ${(props) => props.theme.fonts.title};
`

const Btn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 28px;
  background-color: black;
`

const MyCalendar = styled(Calendar)`
  width: 370px;
  height: 590px;
  margin: 0px 20px 0px 20px;
`

const DayStyle = styled(View)`
  width: 50px;
  height: 65px;
  align-items: center;
  background-color: ${(props) => (props.isSelected ? '#c6e4ee' : 'transparent')};
`

const DayNum = styled(Text)`
  align-items: center;
  color: ${props => props.textColor};
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
  font-family: ${(props) => props.theme.fonts.content};
`

const CalendarImage = styled(Image)`
  width: 95%;
  height: 95%;
  border-radius: 5px;
`

function DiaryScreen () {
  const navigation = useNavigation()
  const { calendarData, getCalendar } = useDiaryStore()

  useEffect (() => {
    // 컴포넌트 마운트 시 현재 달의 데이터를 불러옵니다.
    const today = new Date()
    console.log(today)
    const year = today.getFullYear().toString()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    getCalendar(year, month)
  }, [])

  // 달 이동할 때 달 정보 받음
  const getDate = (year, month) => {
    console.log(year, month)
    getCalendar(`${year}`, `${month.toString().padStart(2, '0')}`)
  }

  const moveDiaryDetail = (date, dayData) => {
    if (dayData.length > 0) {
      navigation.navigate("DiaryDetail", {
        date: date,
        dayData: dayData[0],
      })
    }
  }

  const moveDiaryCreate = () => {
    navigation.navigate("DiaryCreate")
  }

  return (
    <Container>
      <JustifyView>
        <Title>나의 요리 달력</Title>
        <BtnContainer>
          <Btn onPress={moveDiaryCreate}>
            <Icon name="add" size={24} color="white" />
          </Btn>
        </BtnContainer>
      </JustifyView>

      <MyCalendar
        onMonthChange={(month) => {
          getDate(month.year, month.month)
        }}

        dayComponent={({date, state}) => {
          const dayData = calendarData.filter(food => food.photoDate === date.dateString)

          let textColor = '#000' // 기본 텍스트 색상

          if (state === 'disabled') {
            textColor = '#d9e1e8' // 비활성화된 날짜(저번달/다음달 날짜)의 색상
          } else if (state === 'today') {
            textColor = 'red'
          }

          return (
            <TouchableOpacity onPress={() => moveDiaryDetail(date, dayData)}>
              <DayStyle isSelected={state === 'selected'}>
                <DayNum textColor={textColor} isToday={state === 'today'}>
                  {date.day}
                </DayNum>
                {state !== 'disabled' && 
                  calendarData.map((food) => {
                    return food.photoDate === date.dateString ? 
                    <CalendarImage
                      key={food.id}
                      // source={{ uri: `https://i.namu.wiki/i/0e2H0MymA2D0hthFVdH0MpUTxcVHLuAMaVv7mpWlyMHzxsFIaDkN1VRfX_nLLTlUde0t3sq97DIfteY0XrucKC7BnO4X4xtAVbC5O1TKYG0XTUXlOVMnbM7LdoBCiGkXqPT6qE1RuaaKqsrj5ojweQ.webp` }}
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
  )
}

export default DiaryScreen


// const dummyData = [
//   { "id": 1,  "foodName": "김치 볶음밥" , "photoUrl" : 'https://i.namu.wiki/i/pspe5vjdPCZZ_5fKatNEzPXtxlNCXBViBW6clJIt0h8JkmTng-HrZ8oUTi5rsTeIM8QNkinpscMsxN_OVGFEe7Fli7g0WMkdjnSooiGRVnjG3K2oWN9hsUzLwl5Mk-E4Nd8xv1DTiS2cEbhSDU_2fQ.webp' , "photoDate" : "2024-03-05"},
//   { "id": 2, "foodName": "떡볶이" , "photoUrl" : 'https://i.namu.wiki/i/0e2H0MymA2D0hthFVdH0MpUTxcVHLuAMaVv7mpWlyMHzxsFIaDkN1VRfX_nLLTlUde0t3sq97DIfteY0XrucKC7BnO4X4xtAVbC5O1TKYG0XTUXlOVMnbM7LdoBCiGkXqPT6qE1RuaaKqsrj5ojweQ.webp' , "photoDate" : "2024-03-11"},
//   { "id": 3, "foodName": "갈비찜" , "photoUrl" : 'https://i.namu.wiki/i/tDfglDAem96NXwHVOFDTKYhqPLk2ZIP9UdFJvsjfdeUQjkmJYwRCgp6xlZy9r_APahob2Em7LZ0h5yI1CjM6UMxd1ME3HsILSE9OEQWpxR45VSEc-PwTvsjMWqSLf9qWubvPliRBE7cHLw9DkHLL1A.webp' , "photoDate" : "2024-03-13"},
//   { "id": 4, "foodName": "피자" , "photoUrl" : 'https://i.namu.wiki/i/di644s1pVGwIOo7X51GPdl1d0-kXLv4QdHPx4-C-ctKT1zaeSwnsoU0cOYI-JIPg4rjzzQLbn7WQiiIZOnlUXTvKnl8W-FouxYPj5avKfMPqDylc6a7Grszr69IWjWO-83apv0-sEyp_eYgCAaBoLg.webp' , "photoDate" : "2024-03-22"},
//   { "id": 5, "foodName": "뼈해장국" , "photoUrl" : 'https://i.namu.wiki/i/ywRdkOZAdp4dU3ItrNm36NjVx3sbEE6PYVvNVYpRa9MUDtKIxxejpM-jAXGl9fHGavoYESWtzbf7C0LA9RBGsS63D8KY1eINfE4ZQf-36gNq-fDtiJu9fXkS5hE01eY2ArhJcagnO7pMdtRz2e0dsA.webp' , "photoDate" : "2024-03-24"},
//   { "id": 6, "foodName": "돈가스" , "photoUrl" : 'https://i.namu.wiki/i/870lvjrMKGTyx00arSIaji0nFXyrxh7C-8uMe4WA0k9mhlJUOnkRFz4r4w5411--p2I4Vl1TmDHjEWOJ5xpUladA9gGNBWJmJDR2kHavjNUGh6K3HVSbygWa3GsUMbjr0M755QOGtqS5Pc7M3LpXSg.webp' , "photoDate" : "2024-03-29"},
//   { "id": 7, "foodName": "고등어구이" , "photoUrl" : 'https://i.namu.wiki/i/QncptNs6gl_Zyh-LEPsb_pEOkFhYKjvlOHUm0yNGp9iwCRUmUVjdJT9uxEEHIH6I0YW8BMq2YnvDlSV10wI3apuzbl_hDUpgH8KYCNFUqRc-E2s4JqnsVwWMqdHt26Kqsw3O4qSK9NLlvdjzOnk1Xw.webp' , "photoDate" : "2024-03-01"},
//  ]