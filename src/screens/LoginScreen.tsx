import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { PrimaryButton } from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

export default function LoginScreen() {
  const [dealerId, setDealerId] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [dealerError, setDealerError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function onLogin() {
    const isDealerNumeric = /^\d{8}$/.test(dealerId);
    const isPasswordValid = password.length === 8;

    setDealerError(isDealerNumeric ? null : 'Dealer ID must be 8 digits');
    setPasswordError(isPasswordValid ? null : 'Password must be exactly 8 characters');

    if (isDealerNumeric && isPasswordValid) {
      navigation.navigate('Payment');
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Text style={styles.brand}>SAM4POS</Text>
        <Text style={styles.subtitle}>SAM4POS PLU Manager</Text>

        <View style={styles.spacer16} />
        <Input
          placeholder="Dealer ID"
          value={dealerId}
          onChangeText={(t) => {
            const digitsOnly = t.replace(/\D/g, '').slice(0, 8);
            setDealerId(digitsOnly);
            if (dealerError) setDealerError(null);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={8}
        />
        {dealerError ? <Text style={styles.error}>{dealerError}</Text> : null}

        <View style={styles.spacer12} />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(t) => {
            const limited = t.slice(0, 8);
            setPassword(limited);
            if (passwordError) setPasswordError(null);
          }}
          autoCapitalize="none"
          secureTextEntry
          secureToggle
          maxLength={8}
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <View style={styles.rememberRow}>
          <Checkbox checked={remember} onChange={setRemember} label="Remember me" />
        </View>

        <PrimaryButton title="Log in" onPress={onLogin} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.card,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  brand: {
    fontSize: 44,
    color: colors.primary,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    textAlign: 'center',
    color: colors.mutedText,
    fontSize: 18,
  },
  spacer16: { height: 16 },
  spacer12: { height: 12 },
  rememberRow: {
    marginVertical: 16,
  },
  error: {
    color: '#DC2626',
    marginTop: 6,
    marginBottom: 4,
  },
});


