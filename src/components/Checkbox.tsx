import React from 'react';
import { Pressable, View, StyleSheet, Text, Image } from 'react-native';
import { colors } from '../theme/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../theme/Metrics';
import { FontFamily } from '../assets/fonts';
import { Icons } from '../assets/icons';

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
};

export function Checkbox({ checked, onChange, label }: Props) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      onPress={() => onChange(!checked)}
      style={styles.row}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Image source={Icons.correct} style={{ width: moderateScale(10), height: moderateScale(10), tintColor: colors.primary }} resizeMode='contain' /> : null}
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1.33),
    borderColor: colors.black,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    borderColor: colors.primary,
  },
  tick: {
    color: colors.primary,
    fontSize: moderateScale(14),
    lineHeight: verticalScale(16),
    includeFontPadding: false,
  },
  label: {
    marginLeft: horizontalScale(8),
    color: colors.text,
    fontWeight: '400',
    fontFamily: FontFamily.semiBold,
    fontSize: moderateScale(14),
    includeFontPadding: false,
  },
});
