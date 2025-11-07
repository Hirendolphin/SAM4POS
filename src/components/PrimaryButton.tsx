import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { FontFamily } from '../assets/fonts';
import { colors } from '../theme/colors';
import { moderateScale, verticalScale } from '../theme/Metrics';

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: any;
};

export function PrimaryButton({ title, onPress, style, labelStyle }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.title, labelStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(5),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
  },
  title: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    includeFontPadding: false,
  },
});
