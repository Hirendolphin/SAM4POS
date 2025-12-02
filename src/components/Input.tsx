import React, { forwardRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Icons } from '../assets/icons';
import { colors } from '../theme/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../theme/Metrics';

type Props = TextInputProps & {
  label?: string;
  secureToggle?: boolean;
};

export const Input = forwardRef<TextInput, Props>(function Input(
  { label, style, secureTextEntry, secureToggle, ...rest },
  ref,
) {
  const [hidden, setHidden] = useState<boolean>(!!secureTextEntry);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputRow}>
        <TextInput
          ref={ref}
          placeholderTextColor={colors.mutedText}
          style={[styles.input, style]}
          secureTextEntry={hidden}
          {...rest}
        />
        {secureToggle ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => setHidden(v => !v)}
            style={styles.eyeBtn}
          >
            {hidden ? (
              <Image
                source={Icons.eye_close}
                style={{ width: moderateScale(24), height: moderateScale(24) }}
              />
            ) : (
              <Image
                source={Icons.eye}
                style={{ width: moderateScale(24), height: moderateScale(24) }}
              />
            )}
          </Pressable>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: moderateScale(14),
    color: colors.mutedText,
    marginBottom: verticalScale(8),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: colors.inputBorder,
    backgroundColor: colors.white,
    borderRadius: moderateScale(14),
    paddingHorizontal: horizontalScale(16),
    height: verticalScale(56),
    includeFontPadding: false,
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: colors.text,
    includeFontPadding: false,
  },
  eyeBtn: {
    paddingLeft: horizontalScale(8),
  },
  eyeText: {
    fontSize: moderateScale(18),
  },
});
