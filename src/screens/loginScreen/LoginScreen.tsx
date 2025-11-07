import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import { Images } from '../../assets/images';
import { Checkbox } from '../../components/Checkbox';
import { Input } from '../../components/Input';
import { PrimaryButton } from '../../components/PrimaryButton';
import LoginController from './LoginController';
import styles from './LoginScreenStyle';

export default function LoginScreen() {
  const {
    dealerId,
    setDealerId,
    dealerError,
    setDealerError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    remember,
    setRemember,
    onLogin,
  } = LoginController();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        {/* <Text style={styles.brand}>SAM4POS</Text> */}
        <Image source={Images.logo} style={{ alignSelf: 'center' }} />
        <Text style={styles.subtitle}>SAM4POS PLU Manager</Text>

        <View style={styles.spacer16} />
        <Input
          placeholder="Dealer ID"
          value={dealerId}
          onChangeText={t => {
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
          onChangeText={t => {
            const limited = t.slice(0, 8);
            setPassword(limited);
            if (passwordError) setPasswordError(null);
          }}
          autoCapitalize="none"
          secureTextEntry
          secureToggle
          maxLength={8}
        />
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}

        <View style={styles.rememberRow}>
          <Checkbox
            checked={remember}
            onChange={setRemember}
            label="Remember me"
          />
        </View>

        <PrimaryButton title="Log in" onPress={onLogin} />
      </View>
    </KeyboardAvoidingView>
  );
}
