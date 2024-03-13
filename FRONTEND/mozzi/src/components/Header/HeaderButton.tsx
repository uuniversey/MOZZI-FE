import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TypeIconName = string;

export const HeaderIcon: React.FC<{
  onPress: () => void;
  iconName: TypeIconName;
}> = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Ionicons name={props.iconName} size={30} color="black" />
  </TouchableOpacity>
);