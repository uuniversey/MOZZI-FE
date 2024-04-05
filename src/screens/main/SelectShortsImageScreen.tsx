import React, { useEffect, useState } from 'react'
import { Image, View, Text, Alert, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from '../../components/Header/Header'
import { useNavigation } from '@react-navigation/native'
import SmallButton from '../../components/Button/SmallButton'
import useVideoStore from '../../store/RecapStore'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useProfileStore from '../../store/ProfileStore'

type ButtonProps = {
  title: string
  onPress: () => void
}

const imageSize = (Dimensions.get('window').width / 3) - 25;

const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
  padding: 0 16px 0 16px;
`

const HeaderTitle = styled(Text)`
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 28px;
  margin-bottom: 20px;
  align-self: flex-start;
`

const ButtonContainer = styled(View)`
  flex-direction: column;
  margin-bottom: 20px;
  padding: 12px;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
`

const ButtonGroup = styled(View)`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
`

const StyledButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.palette.pointDark};
  border-radius: 10px;
  padding: 3px 5px 3px 5px;
  align-items: center;
  align-self: flex-end;
`

const ButtonText = styled(Text)`
  color: ${(props) => props.theme.palette.font};
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.content};
`

const ImageText = styled(Text)<{ excess?: boolean }>`
  font-size: 15px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${({ excess }) => (excess ? 'red' : 'props.theme.palette.font')};
`

const ImageContainer = styled(View)`
  padding: 12px;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
`

const ImageGroup = styled(View)`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-Wrap: wrap;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
`

const StyledImage = styled(Image)`
  width: ${imageSize}px;
  height: ${imageSize}px;
  margin: 3px;
`

const StyledScrollView = styled(View)`
  height: 305px;
  margin-top: 8px;
`

const SelectableImage = styled(StyledImage)<{ isSelected: boolean }>`
  /* 선택했으면 선택했다고 표시 */
  /* 이미 10개 이상이면 선택했을 때 색이 변하지 않아야 함. */
  opacity: ${({ isSelected }) => (isSelected ? 0.2 : 1)};
`

const SelectableMusic = styled(StyledButton)<{ isSelected: boolean }>`
  /* 선택했으면 선택했다고 표시 */
  /* 이미 10개 이상이면 선택했을 때 색이 변하지 않아야 함. */
  opacity: ${({ isSelected }) => (isSelected ? 0.3 : 1)};
`

const MoodButton: React.FC<ButtonProps> = ({ title, onPress }) => (
  // <SmallButton
  //   text={title}
  //   onPress={onPress}
  // />
  <StyledButton onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </StyledButton>
)


function SelectShortsImageScreen () {
  
  const navigation = useNavigation()

  const [selectedMusic, setSelectedMusic] = useState<number | null>(null)
  const [imageCount, setImageCount] = useState<number>(0)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  // const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [excessImage, setExcessImage] = useState<boolean>(false)
  const [shortsImageList, setShortsImageList] = useState<[]>([])
  const { profileData } = useProfileStore()


  const toggleImageSelection = (imageId: string) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId))
      setImageCount((prevCount) => prevCount - 1)
      setExcessImage(false)
    } else {
      if (imageCount < 10) {
        setSelectedImages([...selectedImages, imageId]);
        setImageCount((prevCount) => prevCount + 1)
        setExcessImage(false)
      } else {
        setExcessImage(true)
      }
    }
  }


  const toggleMusicSelection = (index: number) => {
    if (selectedMusic !== index) {
      setSelectedMusic(index)
      // setImageCount((prevCount) => prevCount - 1)
      // setExcessImage(false)
    } else if (selectedMusic === index) {
      setSelectedMusic(null)
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  // 회원의 이미지 불러오는 axios 필요함.
  const getImages = async () => {
    const token = await AsyncStorage.getItem('accessToken')
    try {
      const response = await axios.get('https://a304.site/api/mozzi/diary/getMyWholeDiary', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      }
    })
      setShortsImageList(response.data.foods)
      console.log(response, '------------------')
    } catch (error) {
      //응답 실패
      console.error(error)
    }
  }

  useEffect(() => {
    getImages()
  }, [])
  

  const renderImages = () => {
    return shortsImageList.map((image) => { // Assuming 'image.id' and 'image.photoUrl' are valid and 'image.id' is a string
      // const startIndex = image.photoUrl.indexOf("com/") + "com/".length
      // // ".jpg"의 인덱스를 찾음
      // const endIndex = image.photoUrl.indexOf(".j")
      // // 시작 인덱스와 끝 인덱스를 사용하여 부분 문자열을 추출
      // const extractedString = image.photoUrl.substring(startIndex, endIndex)

      const isImageSelected = selectedImages.includes(image.photoUrl)
      return (
        <TouchableOpacity key={image.id} onPress={() => toggleImageSelection(image.photoUrl)}>
          <SelectableImage
            source={{ uri: image.photoUrl }}
            isSelected={isImageSelected && imageCount <= 10}
          />
        </TouchableOpacity>
      )
    })
  }

  const renderMusic = () => {
  const musicList = [
    {
      moodId: 1,
      mood: "편안한",
    }, 
    {moodId: 2,
      mood: "감성적인"
    }, 
    {moodId: 3,
      mood: "산뜻한"
    }, 
    {moodId: 4,
      mood: "잔잔한"
    }, 
    {moodId: 5,
      mood: "발랄한"
    }
  ]

  const musicImages = musicList.map((music, index) => (
    <SelectableMusic key={index} isSelected={selectedMusic === music.moodId}>
      <MoodButton title={music.mood} onPress={() => toggleMusicSelection(music.moodId)} />
    </SelectableMusic>
  ))

    return musicImages
  } 

  // 선택한 이미지 번호랑, 노래 번호 전달
  const createShorts =  async (userId: string, selectedMusic: number, selectedImages: string[]) => {
    try {
      console.log(userId, selectedImages, selectedMusic)
      // useVideoStore.getState().setVideoComplete(true)
      navigation.navigate("RecapLanding")
      const response = await axios.post('https://a304.site/api/recommend/datas/make_video/', {
        user_id: userId,
        image_list: selectedImages,
        bgm_category: selectedMusic
      })
      console.log(response)
      useVideoStore.getState().setVideoComplete(true)

      // if ((imageCount > 0) && (selectedMusic !== null )) {
      // navigation.navigate("RecapLanding")
      
      //   // console.log(imageCount, selectedMusic, "선택하지 않은 항목이 있습니다.")
      // } else {
      //   // console.log(imageCount, selectedMusic, "선택하지 않은 항목이 있습니다.")
      // }

    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  // const moveRecapLanding = () => {
  //   if ((imageCount > 0) && (selectedMusic !== null )) {
  //     navigation.navigate("RecapLanding") 
  //     // console.log(imageCount, selectedMusic, "선택하지 않은 항목이 있습니다.")
  //   } else {
  //     // console.log(imageCount, selectedMusic, "선택하지 않은 항목이 있습니다.")
  //   }
  // }


  // const callMakeVideoApi = async (userId: string, bgmCategory: number) => {
  //   try {
  //     const response = await axios.post('http://10.0.2.2:8000/maker/video_yk/', {
  //       user_id: userId,
  //       bgm_category: bgmCategory,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     //응답 실패
  //     console.error(error);
  //   }
  // }
  
  return (
    <>
      <Header>
          <Header.Icon iconName="arrow-back" onPress={goBack} />
      </Header>
      <ScreenContainer>
        <HeaderTitle>쇼츠 만들기 (1/2)</HeaderTitle>
        {/* 노래 선택 */}
        <ButtonContainer>
          <IconFontAwesome name="music" size={25}/>
          <ButtonGroup>
            {renderMusic()}
          </ButtonGroup>
        </ButtonContainer>
        {/* 이미지 선택 */}
        <ImageContainer>
          <Icon name="photo-size-select-actual" size={25} />
          <ImageText excess={excessImage}>
            {imageCount} / 
          10 {excessImage && "10개 이하로 선택해 주세요."}
          </ImageText>
          <StyledScrollView>
            <ScrollView>
              <ImageGroup>
                {renderImages()}
              </ImageGroup>
            </ScrollView>
          </StyledScrollView>
        </ImageContainer>
        <SmallButton
          text="등록"
          onPress={() => {
            if (imageCount > 0 && selectedMusic !== null) {
                    createShorts(profileData.id, selectedMusic, selectedImages)
            } else {
              Alert.alert("알림", "음악과 이미지가 전부 선택되지 않으면 모찌가 쇼츠를 만들 수 없어요! 😥");
            }
          }}
          style={{
            marginTop: 20,
          }}
        />
      </ScreenContainer>
    </>
  )
}

export default SelectShortsImageScreen