import { View, Text, TouchableOpacity, StyleSheet, Platform, PermissionsAndroid } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import RNFetchBlob from 'rn-fetch-blob'
import { Header } from '../../components/Header/Header'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  background-color: #FFFEF2;
  align-items: center;
`

const HeaderText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 20px;
  align-self: flex-start;
  padding-left: 28px;
  padding-right: 28px;
`

const PlayButton = styled.TouchableOpacity`
  border-radius: 20px;
  width: 350px;
  height: 350px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
  border-color: rgba(0, 0, 0, 0.2);
  background-color: #FFFEF2;
  border-width: 2px;
  elevation: 2;
`

const DownloadButton = styled.TouchableOpacity`
  width: 85%;
  border-radius: 20px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  margin-right: 16px;
  align-items: center;
  border-color: rgba(0, 0, 0, 0.2);
  background-color: #F9F7BB;
  border-width: 2px;
  elevation: 2;
`

const DownloadButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

function MakeShortsScreen () {

  const navigation = useNavigation() 

  // const goBack = () => {
  //   navigation.goBack()
  //  }

  const goRecap = () => {
  navigation.navigate("Recap")
  }

  const downloadVideo = async () => {
  // 안드로이드의 경우 저장소 접근 권한 확인
  // console.log('hi')
  if (!(Platform.OS === 'android') && !(await hasStoragePermission())) {
    console.log('hi')
    return
  }

  try {
    // console.log('hi')
    const url = 'http://10.0.2.2:8000/maker/download_video/'; // 서버의 엔드포인트 URL
    const localFile = `${RNFetchBlob.fs.dirs.DocumentDir}/baloo365.mp4`; // 파일을 저장할 로컬 경로
    const response = await RNFetchBlob.config({
        fileCache: true,
        path: localFile,
        addAndroidDownloads: {
          useDownloadManager: true, 
          notification: true,
          path: RNFetchBlob.fs.dirs.DownloadDir + '/baloo365.mp4', 
          description: 'Downloading image.',
          mime: 'video/mp4',
          mediaScannable: true,
        },
    }).fetch('GET', url);

    console.log('The file is save to:', response.path())
  } catch (error) {
    console.error(error)
  }
}
  
  const hasStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
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

  return (
    <>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={goRecap} />
      </Header>
      <Container>
        <HeaderText>쇼츠 만들기</HeaderText>
        <PlayButton>
          <Icon name="play-circle" size={60} color="#000" />
        </PlayButton>
        <DownloadButton onPress={downloadVideo}>
          <DownloadButtonText>다운로드</DownloadButtonText>
        </DownloadButton>
      </Container>
    </>
  )
}


export default MakeShortsScreen