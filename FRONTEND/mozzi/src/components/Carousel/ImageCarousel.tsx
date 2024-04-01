// import React, { useState } from 'react'
// import { Image, TouchableOpacity } from 'react-native'
// import styled from 'styled-components/native'
// import Icon from 'react-native-vector-icons/MaterialIcons'
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
// import { Header } from '../../components/Header/Header'
// import { useNavigation } from '@react-navigation/native'

// type ButtonProps = {
//   title: string;
//   onPress: () => void
// }

// const ScreenContainer = styled.View`
//   flex: 1;
//   background-color: #FFFEF2;
//   padding: 20px;
// `

// const HeaderTitle = styled.Text`
//   font-size: 28px;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 20px;
//   align-self: flex-start;
// `

// const ButtonContainer = styled.View`
//   flex-direction: column;
//   margin-bottom: 20px;
//   padding: 16px;
//   background-color: #F9F7BB;
//   border-radius: 10px;
//   height: 129px;
// `

// const ButtonGroup = styled.View`
//   margin-top: 20px;
//   flex-direction: row;
//   justify-content: space-between;
//   background-color: #F9F7BB;
//   border-radius: 10px;
// `

// const StyledButton = styled.TouchableOpacity`
//   background-color: #E4E196;
//   border-radius: 10px;
//   padding: 10px 15px;
// `

// const ButtonText = styled.Text`
//   color: #000;
//   font-size: 12px;
// `

// const ImageContainer = styled.View`
//   padding: 16px;
//   background-color: #F9F7BB;
//   border-radius: 10px;
//   /* width: 350;
//   height: 190; */
// `

// const ImageGroup = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   padding-top: 26px;
//   padding-bottom: 26px;
//   background-color: #F9F7BB;
//   border-radius: 10px;
// `

// const StyledImage = styled.Image`
//   width: 110px;
//   height: 110px;
// `

// const IconButton = styled(Icon.Button)`
//   margin-top: 20px;
//   border-radius: 10px;
//   background-color: #EFEAB5;
// `

// const MoodButton: React.FC<ButtonProps> = ({ title, onPress }) => (
//   <StyledButton onPress={onPress}>
//     <ButtonText>{title}</ButtonText>
//   </StyledButton>
// )


// function SelectShortsImageScreen () {
  
//   const navigation = useNavigation()
//   const [selectedMusic, setSelectedMusic] = useState<number | null>(null)

//   const goBack = () => {
//     navigation.goBack()
//   }

//   const onPress = () => {
//     console.log('Button pressed')
//   }

//   return (
//     <>
//       <Header>
//           <Header.Icon iconName="arrow-back" onPress={goBack} />
//       </Header>
//       <ScreenContainer>
//         <HeaderTitle>쇼츠 만들기 (1/2)</HeaderTitle>
//         <ButtonContainer>
//           <IconFontAwesome name="music" size={30}/>
//           <ButtonGroup>
//             <MoodButton title="편안한" onPress={onPress} />
//             <MoodButton title="감성적인" onPress={onPress} />
//             <MoodButton title="산뜻한" onPress={onPress} />
//             <MoodButton title="잔잔한" onPress={onPress} />
//             <MoodButton title="발랄한" onPress={onPress} />
//           </ButtonGroup>
//         </ButtonContainer>
//         <ImageContainer>
//           <Icon name="photo-size-select-actual" size={30}/>
//           <ImageGroup>
//             <StyledImage source={require('../../assets/recommend/pizza.jpg')} />
//             <StyledImage source={require('../../assets/recommend/pizza.jpg')} />
//             <StyledImage source={require('../../assets/recommend/pizza.jpg')} />
//           </ImageGroup>
//         </ImageContainer>
//       </ScreenContainer>
//     </>
//   )
// }


import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, StyleSheet } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

interface Entry {
    thumbnail: string | null;
    title: string | null;
}

interface MyCarouselState {
    entries: Entry[];
}

interface RenderItemParams {
    item: Entry;
    index: number;
}

interface MyCarouselProps {
  sliderWidth: number;
  itemWidth: number;
}

export default class MyCarousel extends Component<MyCarouselProps, MyCarouselState> {
  data = [
  {
    thumbnail: require('../../assets/illustration/pizza.jpg'),
    title: 'pizza',
  },
  {
    thumbnail: require('../../assets/illustration/pizza.jpg'),
    title: 'pizza',
  },
  {
    thumbnail: require('../../assets/illustration/pizza.jpg'),
    title: 'pizza',
  },
  {
    thumbnail: require('../../assets/illustration/pizza.jpg'),
    title: 'pizza',
  },
  {
    thumbnail: require('../../assets/illustration/pizza.jpg'),
    title: 'pizza',
  },
  ]  
  renderItem = ({item, index}: RenderItemParams, parallaxProps?: any) => {
        return (
            <View style={styles.item} key={index}>
                <ParallaxImage
                    source={item.thumbnail}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    }

    render(): React.ReactElement {
        return (
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={this.data}
                renderItem={this.renderItem}
                hasParallaxImages={true}
            />
        );
    }
} 

const styles = StyleSheet.create({
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 1,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});
