import React from 'react';
import styled from 'styled-components/native';
import { Image, Text, View } from 'react-native';

const Stamp = ({ source }) => {
  // 이미지에 워터마크를 추가하는 로직 필요

  return (
    <View>
      <Image source={source} style={{ width: 300, height: 300 }} />
      <Text style={{ position: 'absolute', bottom: 10, right: 10, color: 'white' }}>
        모찌
      </Text>
    </View>
  );
};

export default Stamp;
