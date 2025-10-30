import React, { useState, forwardRef } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, Pressable } from 'react-native';
import { colors } from '../theme/colors';

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
          <Pressable accessibilityRole="button" onPress={() => setHidden(v => !v)} style={styles.eyeBtn}>
            <Text style={styles.eyeText}>{hidden ? '🙈' : '👁️'}</Text>
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
    fontSize: 14,
    color: colors.mutedText,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  eyeBtn: {
    paddingLeft: 8,
  },
  eyeText: {
    fontSize: 18,
  },
});



