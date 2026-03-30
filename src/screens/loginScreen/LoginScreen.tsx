import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Images } from '../../assets/images';
// import { Checkbox } from '../../components/Checkbox';
import { Input } from '../../components/Input';
import { PrimaryButton } from '../../components/PrimaryButton';
import LoginController from './LoginController';
import styles from './LoginScreenStyle';
import ProgressModal from '../../components/ProgressModal';
import { moderateScale } from '../../theme/Metrics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ClientInfoModal from '../../components/ClientInfoModal';
import { colors } from '../../theme/colors';
import { Checkbox } from '../../components/Checkbox';
import SavedCredentialsModal from '../../components/SavedCredentialsModal';

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
    loading,
    clientModalVisible,
    setClientModalVisible,
    onSubmitClientInfo,
    savedCredentialsModalVisible,
    setSavedCredentialsModalVisible,
    savedCredentials,
    handleLoginWithSavedCreds,
  } = LoginController();
  const isAndroid15 = Platform.OS === 'android' && Platform.Version >= 35;

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={isAndroid15 ? true : false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={Images.logo} style={{ alignSelf: 'center' }} />
            <Text style={styles.subtitle}>SAM4POS PLU Manager</Text>

            <View style={styles.spacer16} />
            <Input
              placeholder="Dealer ID"
              value={dealerId}
              onChangeText={t => {
                setDealerId(t);
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {dealerError ? (
              <Text style={styles.error}>{dealerError}</Text>
            ) : null}

            <View style={styles.spacer12} />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={t => {
                setPassword(t);
                if (passwordError) setPasswordError(null);
              }}
              autoCapitalize="none"
              secureTextEntry
              secureToggle
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
            <PrimaryButton
              title="Log in"
              onPress={onLogin}
              style={{ marginTop: moderateScale(15) }}
            />
            {loading && <ProgressModal ismodelVisible={loading} />}

            <ClientInfoModal
              visible={clientModalVisible}
              onClose={() => setClientModalVisible(false)}
              onSubmit={onSubmitClientInfo}
            />

            <SavedCredentialsModal
              visible={savedCredentialsModalVisible}
              credentialsList={savedCredentials || []}
              onClose={() => setSavedCredentialsModalVisible(false)}
              onLogin={handleLoginWithSavedCreds}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
