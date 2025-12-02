import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../theme/Metrics';
import { colors } from '../theme/colors';
import { FontFamily } from '../assets/fonts';

interface EmptyListProps {
  message?: string;
  containerStyle?: object;
  textStyle?: object;
}

const EmptyListComponent: React.FC<EmptyListProps> = ({
  message,
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.message, textStyle]}>{message}</Text>
    </View>
  );
};

export default memo(EmptyListComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(50),
  },
  icon: {
    width: moderateScale(80),
    height: moderateScale(80),
    marginBottom: moderateScale(15),
  },
  message: {
    fontSize: moderateScale(16),
    color: colors.black,
    includeFontPadding: false,
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    textAlign: 'center',
  },
});
