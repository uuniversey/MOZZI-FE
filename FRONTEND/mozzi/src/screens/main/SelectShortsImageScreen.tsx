import React, { useState } from 'react'
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Header } from '../../components/Header/Header'
import { useNavigation } from '@react-navigation/native'
import MyCarousel from '../../components/Carousel/ImageCarousel'
import { Text } from 'react-native-svg'

type ButtonProps = {
  title: string
  onPress: () => void
}

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #FFFEF2;
  padding: 20px;
`

const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  align-self: flex-start;
`

const ButtonContainer = styled.View`
  flex-direction: column;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #F9F7BB;
  border-radius: 10px;
  height: 129px;
`

const ButtonGroup = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  background-color: #F9F7BB;
  border-radius: 10px;
`

const StyledButton = styled.TouchableOpacity`
  background-color: #E4E196;
  border-radius: 10px;
  padding: 5px 7px;
`

const ButtonText = styled.Text`
  color: #000;
  font-size: 12px;
`

const ImageText = styled.Text<{ excess?: boolean }>`
  font-size: 15px;
  color: ${({ excess }) => (excess ? 'red' : '#000')};
`
const excessImageText = styled.Text`
  color: #000;
  font-size: 15px;
`

const ImageContainer = styled.View`
  padding: 16px;
  background-color: #F9F7BB;
  border-radius: 10px;
  /* width: 350; */
  /* height: 280; */
`

const ImageGroup = styled.View`
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  flex-Wrap: wrap;
  background-color: #F9F7BB;
  border-radius: 10px;
`

const StyledImage = styled.Image`
  width: 105px;
  height: 105px;
  margin: 3px;
`

const StyledScrollView = styled.View`
  height: 270px;
  margin-top: 16px;
`

const EnterContainer = styled.View`
  width: 100%;
  margin-top: 30px;
  flex-direction: row;
  justify-content: flex-end;
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

  const moveRecapLanding = () => {
    navigation.navigate("RecapLanding")
  }

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

  const renderImages = () => {
    const images = [];
    for (let i = 0; i < 15; i++) {
      const isImageSelected = selectedImages.includes(i);
      images.push(
        <TouchableOpacity key={i} onPress={() => toggleImageSelection(i)}>
          <SelectableImage
            source={require('../../assets/recommend/pizza.jpg')}
            isSelected={isImageSelected && imageCount <= 10}
          />
        </TouchableOpacity>
      );
    }
    return images;
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
    <SelectableMusic isSelected={selectedMusic === music.moodId}>
      <MoodButton key={index} title={music.mood} onPress={() => toggleMusicSelection(music.moodId)} />
    </SelectableMusic>
  ))

    return musicImages
  } 

  //   for (let i = 0; i < 15; i++) {
  //     const isImageSelected = selectedImages.includes(i);
  //     images.push(
  //       <TouchableOpacity key={i} onPress={() => toggleImageSelection(i)}>
  //         <SelectableImage
  //           source={require('../../assets/recommend/pizza.jpg')}
  //           isSelected={isImageSelected && imageCount <= 10}
  //         />
  //       </TouchableOpacity>
  //     )
  //   }
  //   return images;
  // };

  return (
    <>
      <Header>
          <Header.Icon iconName="chevron-back" onPress={goBack} />
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
          <EnterButton onPress={moveRecapLanding}>
            <EnterButtonText>등록</EnterButtonText>
          </EnterButton>
        </EnterContainer>
      </ScreenContainer>
    </>
  )
}

export default SelectShortsImageScreen