import { View, ScrollView, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'
import { Header } from '../../components/Header/Header'

import { useNavigation } from '@react-navigation/native'

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
`

const Title = styled(Text)`
  font-size: 20px;
  margin: 30px 0px 30px 20px;
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
  width: 350px;
  height: 400px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.palette.point};
`

const DiaryInfo = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

const BtnContainer = styled(View)`
  display: flex;
  flex-direction: row;
`

const CardView = styled(View)`
  margin-bottom: 20px;
`

const ShareBtn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 28px;
`

const FoodImage = styled(Image)`
  width: 300px;
  height: 300px;
  border-radius: 5px;
`

const FoodTitle = styled(Text)`
  font-size: 20px;
  margin-bottom: 10px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

function DiaryDetailScreen ({ route }) {
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

  return (
    <Container>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>

      <View>
        <Title> <Dot> ● </Dot> {date.year}년 {date.month}월 {date.day}일 요리 일기</Title>
      </View>

      <ScrollView>
        {dayData.map((data) => (
          <CardView key={data.id}>
            <Body>
              <View>
                <DiaryInfo>
                  <FoodTitle>{data.foodName}</FoodTitle> 
                  <BtnContainer>
                    <ShareBtn onPress={() => moveStamp(data)}>
                      <Icon name="ios-share" size={24} color="black" />
                    </ShareBtn>  
                  </BtnContainer>                  
                </DiaryInfo>
                <FoodImage
                  source={{ uri: `${data.photoUrl}` }}
                />
              </View>
            </Body>
          </CardView>
          ))
        }
        
      </ScrollView>
    </Container>
  )
}

export default DiaryDetailScreen
