import React from 'react';
import { View, Text, TextInput, Dimensions, } from 'react-native';
import styled from '@emotion/native';
import { FontColor, PrimaryColor } from '../../constants/Colors';
import { Button } from 'react-native-paper';
import { ButtonType, CenterProps, InputType } from '../../types/types';

export const Container = styled(View)({
  width: '100%',
  display: 'flex',
  height: Dimensions.get("window").height,
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: 'rgb(245,245,245)'


})
export const Center: React.FC<CenterProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export const Input: React.FC<InputType> = ({
  placeholder,
  value,
  error,
  disabled,
  label,
  type,
  handleOnchange
}) => {
  return (
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
      <View style={{ width: '80%' }}>
        <Text style={{ fontSize: 16, color: FontColor, marginBottom: 5 }}>
          {label}
        </Text>
        <TextInput
          style={{ width: '100%', paddingLeft: 10, color: FontColor, borderRadius: 8, borderWidth: 1, borderColor: error ? 'rgb(250,100,100)' : 'rgb(150,150,150)' }}
          onChangeText={(text) => handleOnchange(text)}
          editable={disabled && false}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={FontColor}
        />
        {error && <Text style={{ fontSize: 16 }}>
          {error}
        </Text>}
      </View>
    </View>)
}

export const PrincipalButton: React.FC<ButtonType> = ({ onPress, children, width, marginBottom, marginTop }) => {
  return <Button onPress={onPress} mode="contained" style={{ width: width, marginBottom, marginTop, backgroundColor: PrimaryColor }}>
    {children}
  </Button>
}