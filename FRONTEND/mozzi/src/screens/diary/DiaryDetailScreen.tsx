import { View, Text, TouchableOpacity, Image, PermissionsAndroid, ToastAndroid } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'
import Share from 'react-native-share'
import Snackbar from 'react-native-snackbar'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { Header } from '../../components/Header/Header'

import { useNavigation } from '@react-navigation/native'

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
`

const Title = styled.Text`
  font-size: 20px;
  margin: 30px 0px 30px 20px;
`

const Dot = styled.Text`
  color: #E4E196;
`

const Body = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 400px;
  border-radius: 20px;
  background-color: #F9F7BB;
`

const DiaryInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10;
`

const BtnContainer = styled.View`
  display: flex;
  flex-direction: row;
`

const SaveBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 28px;
  margin-right: 5;
`

const ShareBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 28px;
`

const FoodImage = styled.Image`
  width: 300px;
  height: 300px;
  border-radius: 5px;
`

const FoodTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`

function DiaryDetailScreen ({ route }) {
  const { date } = route.params
  const navigation = useNavigation()

  // getPhotoUri 함수 예시 구현
  const getPhotoUri = () => {
    return require('../../assets/recommend/chicken.jpg');
  };


  // Stamp 화면으로 이동하는 함수
  const navigateToStamp = async () => {
    // getPhotoUri 함수는 이미지 URI를 반환합니다. (이미 구현된 것으로 가정)
    const photoUri = await getPhotoUri();

    // Stamp 화면으로 이동하면서 URI와 다른 필요한 데이터를 전달
    navigation.navigate('Stamp', { photoUri });
  };
  
  
  // 공유 함수
  const moveShared = async () => {
    navigateToStamp();
    // try {
    //   const result = await Share.open(shareOptions);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  // 권한 확인
  const hasStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        
      )
      // console.log('hi')
      if (!hasPermission) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        )
        return status === PermissionsAndroid.RESULTS.GRANTED
      }
      return true
    }
    return true
  }

  // 사진 저장 함수
  const onSave = async () => {
    if (!(Platform.OS === 'android') && !(await hasStoragePermission())) {
      console.log('hi')
      return
    }

    try {
      const uri = await getPhotoUri(); // 이미지의 URI를 얻습니다.
      const result = await CameraRoll.save(uri, { type: 'photo' }); // 이미지를 갤러리에 저장합니다.
      console.log('🐤result', result);
  
      // 저장 성공 후 스낵바를 표시합니다.
      Snackbar.show({
        text: '사진이 갤러리에 저장되었습니다.',
        duration: 1000,
      });
    } catch (error) {
      console.log(error);
      // 오류 발생 시 스낵바를 표시합니다.
      Snackbar.show({
        text: '사진을 저장하는 중 오류가 발생했습니다.',
        duration: 1000,
      });
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
        </Header>

        <View>
          <Title> <Dot>●   </Dot> {date.year}년 {date.month}월 {date.day}일 요리 일기</Title>
        </View>

        <Body>
          <View>
            <DiaryInfo>
              <FoodTitle>비비큐 황금올리브</FoodTitle> 
              <BtnContainer>
                <SaveBtn onPress={onSave} >
                  <Icon name="save-alt" size={24} color="black" />
                </SaveBtn>
                <ShareBtn onPress={moveShared}>
                  <Icon name="ios-share" size={24} color="black" />
                </ShareBtn>  
              </BtnContainer>                  
            </DiaryInfo>
            <FoodImage
              source={require('../../assets/recommend/chicken.jpg')}
            />
            {/* <Stamp source={require('../../assets/recommend/chicken.jpg')} /> */}
          </View>

        </Body>
      </Container>
    </>
  )
}

export default DiaryDetailScreen
