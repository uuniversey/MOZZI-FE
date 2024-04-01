import React, { useState } from 'react'
import { Image, View, Text, Alert, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from '../../components/Header/Header'
import { useNavigation } from '@react-navigation/native'
import useVideoStore from '../../store/RecapStore'
import axios from 'axios'

type ButtonProps = {
  title: string
  onPress: () => void
}

const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
  padding: 20px;
`

const HeaderTitle = styled(Text)`
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  align-self: flex-start;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.title};
`

const ButtonContainer = styled(View)`
  flex-direction: column;
  margin-bottom: 20px;
  padding: 16px;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  height: 129px;
`

const ButtonGroup = styled(View)`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
`

const StyledButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.palette.pointDark};
  border-radius: 10px;
  padding: 5px 7px;
`

const ButtonText = styled(Text)`
  color: ${(props) => props.theme.palette.font};
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.content};
`

const ImageText = styled(Text)<{ excess?: boolean }>`
  font-size: 15px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${({ excess }) => (excess ? 'red' : '#000')};
`

const ImageContainer = styled(View)`
  padding: 16px;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  /* width: 350; */
  /* height: 280; */
`

const ImageGroup = styled(View)`
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  flex-Wrap: wrap;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
`

const StyledImage = styled(Image)`
  width: 105px;
  height: 105px;
  margin: 3px;
`

const StyledScrollView = styled(View)`
  height: 270px;
  margin-top: 16px;
`

const EnterContainer = styled(View)`
  width: 100%;
  margin-top: 30px;
  flex-direction: row;
  justify-content: flex-end;
`

const EnterButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  width: 80px;
  height: 35px;
  justify-content: center;
`

const EnterButtonText = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.content};
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
  <StyledButton onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </StyledButton>
)


function SelectShortsImageScreen () {
  
  const navigation = useNavigation()

  const [selectedMusic, setSelectedMusic] = useState<number | null>(null)
  const [imageCount, setImageCount] = useState<number>(0)
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  // const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [excessImage, setExcessImage] = useState<boolean>(false)



  const toggleImageSelection = (index: number) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
      setImageCount((prevCount) => prevCount - 1)
      setExcessImage(false)
    } else {
      if (imageCount < 10) {
        setSelectedImages([...selectedImages, index])
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
    try {
      const response = await axios.get('http://10.0.2.2:8000/maker/get_image/')
      console.log(response)
    } catch (error) {
      //응답 실패
      console.error(error)
    }
  }

  const renderImages = () => {
    const images = []
    for (let i = 0; i < 15; i++) {
      const isImageSelected = selectedImages.includes(i)
      images.push(
        <TouchableOpacity key={i} onPress={() => toggleImageSelection(i)}>
          <SelectableImage
            source={require('../../assets/illustration/pizza.jpg')}
            isSelected={isImageSelected && imageCount <= 10}
          />
        </TouchableOpacity>
      );
    }
    return images
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
  const createShorts =  async (userId: string, selectedMusic: number, selectedImages: number[]) => {
    try {
      console.log(userId, selectedImages, selectedMusic)
      // useVideoStore.getState().setVideoComplete(true)
      navigation.navigate("RecapLanding")
      const response = await axios.post('http://10.0.2.2:8000/maker/video_yk/', {
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
        <ButtonContainer>
          <IconFontAwesome name="music" size={30}/>
          <ButtonGroup>
            {renderMusic()}
          </ButtonGroup>
        </ButtonContainer>
          <ImageContainer>
            <Icon name="photo-size-select-actual" size={30} />
            <ImageText excess={excessImage}>
              {imageCount} / 
            10 {excessImage && "10개 이하로 선택해주세요."}
            </ImageText>
              <StyledScrollView>
                <ScrollView>
                  <ImageGroup>
                    {renderImages()}
                  </ImageGroup>
                </ScrollView>
              </StyledScrollView>
          </ImageContainer>
          <EnterContainer>
          <EnterButton onPress={() => {
            if (imageCount > 0 && selectedMusic !== null) {
                    createShorts('baloo365', selectedMusic, selectedImages);
            } else {
              Alert.alert("Missing Selection", "Please select at least one image and a music mood.");
            }
          }}>
            <EnterButtonText>등록</EnterButtonText>
          </EnterButton>
        </EnterContainer>
      </ScreenContainer>
    </>
  )
}

export default SelectShortsImageScreen