import { View, Text, TouchableOpacity, StyleSheet, Platform, PermissionsAndroid } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import RNFetchBlob from 'rn-fetch-blob'

function MakeShortsScreen () {

  const navigation = useNavigation() 

  const goBack = () => {
    navigation.goBack()
   }

  const downloadVideo = async () => {
  // 안드로이드의 경우 저장소 접근 권한 확인
  // console.log('hi')
  if (!(Platform.OS === 'android') && !(await hasStoragePermission())) {
    console.log('hi')
    return;
  }

  try {
    // console.log('hi')
    const url = 'http://10.0.2.2:8000/maker/download_video/'; // 서버의 엔드포인트 URL
    const localFile = `${RNFetchBlob.fs.dirs.DocumentDir}/baloo365.mp4`; // 파일을 저장할 로컬 경로
    const response = await RNFetchBlob.config({
        fileCache: true,
        path: localFile,
        addAndroidDownloads: {
          useDownloadManager: true, // <-- this is the key
          notification: true,
          path: RNFetchBlob.fs.dirs.DownloadDir + '/baloo365.mp4', // <-- this is the file path where the download will be saved
          description: 'Downloading image.',
          mime: 'video/mp4', // Correct MIME type for a video file
          mediaScannable: true,
        },
    }).fetch('GET', url);

    console.log('The file is save to:', response.path());
  } catch (error) {
    console.error(error);
  }
};
  
  const hasStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      // console.log('hi')
      if (!hasPermission) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    }
    return true;
  };

  return (
    <>
      <TouchableOpacity onPress={goBack}>
          <Text>뒤로가기</Text>
        </TouchableOpacity>
      <View style={styles.container}>
        {/* <Header>
          <Header.Title title="글작성" />
          <Header.Icon iconName="close" onPress={rootNavigation.goBack} />
        </Header> */}
        <Text style={styles.header}>쇼츠 만들기</Text>
      <TouchableOpacity style={styles.button}>
        <Icon name="play-circle" size={60} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.downloadButton}
      //  onPress={downloadVideo}>
       > 
        <Text style={styles.downloadButtonText}>다운로드</Text>
      </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF2',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 28,
  },
  button: {
    borderRadius: 20,
    width: 350,
    height: 350,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.2)', // 80% 투명도
    backgroundColor: '#FFFEF2',
    borderWidth: 2,
    elevation: 2,
  },
  downloadButton: {
    width: '85%',
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.2)', // 80% 투명도
    backgroundColor: '#F9F7BB',
    borderWidth: 2,
    elevation: 2,
  },
  downloadButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default MakeShortsScreen