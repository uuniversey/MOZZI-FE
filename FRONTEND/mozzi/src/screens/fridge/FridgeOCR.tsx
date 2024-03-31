// OCRComponent.js
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const OCRButton = styled(TouchableOpacity)`
  margin-top: 70px;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 10px;
  width: 70px;
  padding: 5px;
  align-items: center;
  align-self: flex-end;
  z-index: -10;
`
const FridgeOCR = ({ onOcrComplete }) => {
  const handlePress = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        performOcr(response.path);
      }
    });
  };

  const performOcr = async (imagePath) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imagePath,
        type: 'image/jpeg', // or the correct image type
        name: 'image.jpg',
      });

      // Adjust the API endpoint and API key
      const result = await axios.post('YOUR_GOOGLE_CLOUD_VISION_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer YOUR_API_KEY',
        },
      });

      if (result.data && result.data.responses && result.data.responses[0].fullTextAnnotation) {
        const detectedText = result.data.responses[0].fullTextAnnotation.text;
        onOcrComplete(detectedText); // Pass the detected text back to the parent component
      }
    } catch (error) {
      console.error(error);
      Alert.alert('OCR Error', 'Failed to process the image.');
    }
  };

  return (
    <View>
      <OCRButton onPress={handlePress}>
        <Text>사진 인식으로 입력하기</Text>
      </OCRButton>
    </View>
  );
};

export default FridgeOCR;
