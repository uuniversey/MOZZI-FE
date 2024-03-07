import { View, Text, Button } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

function FridgeScreen () {

  const navigation = useNavigation()

  const moveDiaryDetail = () => {
    navigation.navigate("FridgeDetail")
  }
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>나의 냉장고</Text>
        <Button title="Go to Detail" onPress={moveDiaryDetail} />
      </View>
    </>
  )
}

export default FridgeScreen