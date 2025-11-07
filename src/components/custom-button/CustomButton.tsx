import React, { memo } from 'react';
import { Image, Pressable, Text } from 'react-native';
import { CustomButtonProps } from './CustomButtonType';

const CustomButton = ({
  buttonText,
  pressEvent,
  buttonStyle,
  textStyle,
  image,
  imageStyle,
}: CustomButtonProps) => (
  <Pressable onPress={pressEvent} style={buttonStyle}>
    {image && <Image source={image} style={imageStyle} />}
    {buttonText && <Text style={textStyle}>{buttonText}</Text>}
  </Pressable>
);

export default memo(CustomButton);
