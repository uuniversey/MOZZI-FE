import { View, Text, Button, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet, Image  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { launchImageLibrary } from 'react-native-image-picker'
import { format } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Header } from '../../components/Header/Header'
import axios from 'axios'
import styled from 'styled-components/native';

// Styled components definitions
const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
  align-items: center;
`

const DateContainer = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  padding-right: 20px;
`;

const DateText = styled.Text`
  font-weight: 600;
`

const Line = styled.View`
  border-bottom-color: #A4A4A4;
  border-bottom-width: 1px;
  width: 85%;
  align-self: center;
  margin-bottom: 20px;
`

const ImageContainer = styled.View`
  border-width: 1px;
  border-color: #E4E196;
  width: 350px;
  height: 350px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const ImageInnerContainer = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #A4A4A4;
  border-radius: 10px;
  border-style: dotted;
  width: 320px;
  height: 320px;
  justify-content: center;
  align-items: center;
`

const ImageButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`

const ImagePlaceholderText = styled.Text`
  font-size: 24px;
`

const RecipeButton = styled.TouchableOpacity`
  background-color: #F9F7BB;
  border-color: rgba(0, 0, 0, 0.2);
  border-width: 2px;
  padding: 20px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 350px;
  elevation: 2;
`

const EnterContainer = styled.View`
  width: 85%;
  margin-top: 50px;
  flex-direction: row;
  justify-content: flex-end;
`

const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-left: 6px;
`

const EnterButton = styled.TouchableOpacity`
  background-color: #F9F7BB;
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
`

const EnterButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`

const CalendarButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 20px;
`

function DiaryCreateScreen () {
  
  const navigation = useNavigation()

  const moveDiaryCreateSelect = () => {
    navigation.navigate("DiaryCreateSelect")
  }

  const goBack = () => {
   navigation.goBack()
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date)
    setSelectedDate(date)
    hideDatePicker()
  }


  const [imageUri, setImageUri] = useState<string | undefined>()
  const [imageType, setImageType] = useState<string | undefined>()
  const [imageName, setImageName] = useState<string | undefined>()

  const handleChoosePhoto = () => {
    launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 768,
      maxHeight: 768,
      includeBase64: Platform.OS === 'android',
    }, (response) => {
      if (response.assets && response.assets[0].uri) {
        console.log(response.assets[0].uri)
        setImageUri(response.assets[0].uri)
        setImageType(response.assets[0].type)
        // 파일명 한글이라 오류 날 경우, 임의로 파일명 부여할 것
        setImageName(response.assets[0].fileName)
      } else if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage)
      }
    })
  }

  
  const formData = new FormData()
    if (selectedDate) {
      formData.append('date', format(selectedDate, 'yyyy-MM-dd'))
    }
    // formData.append('nickName', nickName)
    if (imageUri && imageType && imageName) {
      // 안드로이드에서는 파일 경로의 수정이 필요함
      const imagePath = Platform.OS === 'android' ? imageUri.replace('file://', '') : imageUri
      
      formData.append('image', {
        name: imageName,
        type: imageType,
        uri: imagePath,
      })
    }

  const createDiary = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/maker/video_yk/', formData, {
        headers: {
          Accept: '*/*',
          'Content-type': 'multipart/form-data',
        },
        transformRequest: data => data,
      })
      console.log(response.data)
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }


  return (
    <>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={goBack} />
      </Header>
      <Container>
        <DateContainer>
          <CalendarButton onPress={showDatePicker}>
            <Icon name="calendar-month" size={32}/>
          </CalendarButton>
            {selectedDate && (
              <DateText>{format(selectedDate, 'yyyy-MM-dd')}</DateText>
            )}
        </DateContainer>
        <Line />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <ImageContainer>
          <ImageInnerContainer onPress={handleChoosePhoto}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: '100%', height: '100%' }} 
              />
            ) : (
              
              <ImageButton onPress={handleChoosePhoto}>
                <ImagePlaceholderText>사진 첨부</ImagePlaceholderText>
              </ImageButton>
              
            )}
           </ImageInnerContainer>
        </ImageContainer>
        <RecipeButton
          onPress={moveDiaryCreateSelect} >
          <Icon name="menu-book" size={20}/>
          <ButtonText>레시피 불러오기</ButtonText>
        </RecipeButton>
        <EnterContainer>
          <EnterButton>
            <EnterButtonText>등록</EnterButtonText>
          </EnterButton>
        </EnterContainer>
      </Container>
    </>
  )
}

export default DiaryCreateScreen