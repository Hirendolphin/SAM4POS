import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
};

export function Checkbox({ checked, onChange, label }: Props) {
  return (
    <Pressable accessibilityRole="checkbox" onPress={() => onChange(!checked)} style={styles.row}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Text style={styles.tick}>✓</Text> : null}
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
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    borderColor: colors.primary,
  },
  tick: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 16,
  },
  label: {
    marginLeft: 8,
    color: colors.text,
    fontSize: 14,
  },
});



