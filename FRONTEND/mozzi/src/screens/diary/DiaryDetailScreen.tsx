import { View, ScrollView, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

import { Header } from '../../components/Header/Header'

import { useNavigation } from '@react-navigation/native'
import useProfileStore from '../../store/ProfileStore'
import useDiaryStore from '../../store/DiaryStore'

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`

const Title = styled(Text)`
  font-size: 20px;
  margin: 10px 0px 20px 20px;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.palette.font};
`

const Dot = styled(Text)`
  color: ${(props) => props.theme.palette.pointDark};
  font-family: ${(props) => props.theme.fonts.content};
`

const Body = styled(View)`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.palette.point};
`

const DiaryInfo = styled(View)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

const FoodTitle = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

const BtnContainer = styled(View)`
  display: flex;
  flex-direction: row;
`

const ShareBtn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 28px;
`

const CardView = styled(View)`
  margin-bottom: 20px;
`

const FoodImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 5px;
`

const ItemContainer = styled(ScrollView)`
  display: flex;
  width: 100%;
  padding: 0 16px 0 16px;
`

function DiaryDetailScreen ({ route }) {
  const { deleteCalendar, getCalendar } = useDiaryStore()
  const { date, dayData } = route.params
  console.log(dayData, '받은 데이데이터')
  const navigation = useNavigation()

  
  // 스탬프 페이지로 이동
  const moveStamp = (data) => {
    navigation.navigate('Stamp', {
      date,
      data,
    })
  }
  
  const deleteDiary = (id) => {
    deleteCalendar(id)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Diary' }],
    })
  }

  return (
    <Container>
      <Header>
        <Header.Icon iconName="arrow-back" onPress={navigation.goBack} />
      </Header>

      <View>
        <Title> 
            <Dot>● </Dot> {date.year}년 {date.month}월 {date.day}일 요리 일기
        </Title>
      </View>

      <ItemContainer>
        {dayData.map((data) => (
          <CardView key={data.id}>
            <Body>
                <DiaryInfo>
                  <FoodTitle>{data.foodName}</FoodTitle> 
                  <BtnContainer>
                    <ShareBtn onPress={() => moveStamp(data)}>
                      <Icon name="ios-share" size={24} color="black" />
                    </ShareBtn>
                    <ShareBtn onPress={() => deleteDiary(data.id)}>
                      <Icon name="delete" size={24} color="black" />
                    </ShareBtn>  
                  </BtnContainer>                  
                </DiaryInfo>
                <FoodImage
                  source={{ uri: `${data.photoUrl}` }}
                />
            </Body>
          </CardView>
          ))
        }       
      </ItemContainer>
    </Container>
  )
}

export default DiaryDetailScreen
