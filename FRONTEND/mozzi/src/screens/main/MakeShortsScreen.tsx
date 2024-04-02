import { View, Text, TouchableOpacity, StyleSheet, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import RNFetchBlob from 'rn-fetch-blob'
import LongButton from '../../components/Button/LongButton'
import { Header } from '../../components/Header/Header'
import styled from 'styled-components/native'
import Video from 'react-native-video'
import useProfileStore from '../../store/ProfileStore'

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
  align-items: center;
  padding: 0 16px 0 16px;
`

const HeaderText = styled(Text)`
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 28px;
  margin-bottom: 20px;
  align-self: flex-start;
`

const PlayButton = styled(View)`
  width: 100%;
  aspect-ratio: 1;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) => props.theme.palette.light};
  background-color: ${(props) => props.theme.palette.background};
  border-width: 1px;
`

function MakeShortsScreen () {

  const navigation = useNavigation() 
  const [videoPath, setVideoPath] = useState<string>(RNFetchBlob.fs.dirs.DownloadDir)
  const { profileData } = useProfileStore()

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
    const userId = "" + profileData.id
    const url = `https://a304.site/api/recommend/datas/download_video/${userId}/` // 서버의 엔드포인트 URL
    const localFile = `${RNFetchBlob.fs.dirs.DocumentDir}/${userId}.mp4` // 파일을 저장할 로컬 경로
    const response = await RNFetchBlob.config({
        fileCache: true,
        path: localFile,
        addAndroidDownloads: {
          useDownloadManager: true, 
          notification: true,
          path: RNFetchBlob.fs.dirs.DownloadDir + `/${userId}.mp4`, 
          description: 'Downloading image.',
          mime: 'video/mp4',
          mediaScannable: true,
        },
    }).fetch('GET', url)

    setVideoPath(localFile)
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

  const previewVideo = async () => {
  
    try {
      const userId = "" + profileData.id
      const url = `https://a304.site/api/recommend/datas/download_video/${userId}/` // 서버의 엔드포인트 URL
      const localFile = `${RNFetchBlob.fs.dirs.DocumentDir}/${userId}.mp4` // 파일을 저장할 로컬 경로
      const response = await RNFetchBlob.config({
          fileCache: true,
          path: localFile,
      }).fetch('GET', url)
  
      setVideoPath(localFile)
      console.log('The file is save to:', response.path())
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    previewVideo()
  
    return () => {
    }
  }, [])
  

  return (
    <>
      <Header>
        <Header.Icon iconName="arrow-back" onPress={goRecap} />
      </Header>
      <Container>
        <HeaderText>쇼츠 만들기 (2/2)</HeaderText>
        <PlayButton>
          <Video
            source={{ uri: videoPath }} // 상태를 사용하여 URI 설정
            style={{ width: '100%', height: '100%' }}
            controls={true}
            resizeMode="contain"
            paused={false} // 재생/중지 여부
            repeat={true}
          />
          {/* <Icon name="play-circle" size={60} color="#000" /> */}
        </PlayButton>
        <LongButton 
          text="다운로드"
          onPress={downloadVideo}
        />
      </Container>
    </>
  )
}


export default MakeShortsScreen