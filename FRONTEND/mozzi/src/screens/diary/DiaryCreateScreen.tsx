import { View, Text, Button, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet, Image  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { launchImageLibrary } from 'react-native-image-picker'
import { format } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'


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
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date)
    hideDatePicker();
  };

  // const rootNavigation = useRootNavigation<'Main'>();
  // type ImagePickerResponse = {
  //   assets?: {
  //     uri?: string;
  //   }[];
  // };

  const [imageUri, setImageUri] = useState<string | undefined>();

  const handleChoosePhoto = () => {
    launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 768,
      maxHeight: 768,
      includeBase64: Platform.OS === 'android',
    }, (response) => {
      if (response.assets && response.assets[0].uri) {
        console.log(response.assets[0].uri);
        setImageUri(response.assets[0].uri);
      } else if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      }
    });
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
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={showDatePicker} style={styles.calendarButton}>
            <Icon name="calendar-month" size={32}/>
          </TouchableOpacity>
            {selectedDate && (
              <Text style={styles.dateText}>{format(selectedDate, 'yyyy-MM-dd')}</Text> // 'PPP' is one of many format options
            )}
        </View>
        <View style={styles.line} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.imageContainer}>
          <View style={styles.imageInnerContainer}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: '100%', height: '100%' }} // Adjust the size as needed
              />
            ) : (
              
              <TouchableOpacity onPress={handleChoosePhoto}>
                <Text style={styles.imagePlaceholderText}>사진 첨부</Text>
              </TouchableOpacity>
              
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.recipeButton}
          onPress={moveDiaryCreateSelect} >
          <Icon name="menu-book" size={20}/>
          <Text style={styles.buttonText}>레시피 불러오기</Text>
        </TouchableOpacity>
        <View style={styles.enterContainer}>
          <TouchableOpacity style={styles.enterButton}>
            <Text style={styles.enterButtonText}>등록</Text>
          </TouchableOpacity>
        </View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'flex-start',
  },
  headerText: {
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#E4E196',
    width: 350,
    height: 350, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageInnerContainer: {
    borderWidth: 1,
    borderColor: '#A4A4A4',
    borderRadius: 10,
    borderStyle: 'dotted',
    width: 320, 
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    width: '100%', 
    height: 50,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    paddingHorizontal: 20,
  },
  dateText: {
    fontWeight: '600',
  },
  line: {
    borderBottomColor: '#A4A4A4', 
    borderBottomWidth: 1, 
    width: '85%', 
    alignSelf: 'center', 
    marginBottom: 20, 
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholderText: {
    fontSize: 24,
  },
  recipeButton: {
    backgroundColor: '#F9F7BB',
    borderColor: 'rgba(0, 0, 0, 0.2)', // 80% 투명도
    borderWidth: 2,
    padding: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    elevation: 2,
  },
  enterContainer: {
    width: '85%',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 6,
  },
  enterButton: {
    backgroundColor: '#F9F7BB',
    borderRadius: 10,
    width: 80,
    height: 35,
    justifyContent: 'center',
  },
  enterButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  calendarButton: {
    padding: 10,
    borderRadius: 20,
  },
  calendarButtonText: {
    fontSize: 24, 
  },
});


export default DiaryCreateScreen