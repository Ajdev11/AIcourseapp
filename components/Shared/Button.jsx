import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from './../../constant/Colors';

export default function Button({ text, type='fill', onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={{
        backgroundColor: type === 'fill' ? "#FF495C" : "transparent",
        padding: 15,
        width: '80%',
        borderRadius: 10,
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: type === 'fill' ? Colors.PRIMARY: Colors.WHITE,
        }}>
      <Text
      style={{
        textAlign: 'center',
        fontSize: 16,
        color: type === 'fill' ? Colors.WHITE : Colors.PRIMARY,
        fontFamily: 'outfit'
        }}
      
      >{text}</Text>
    </TouchableOpacity>
  );
}
