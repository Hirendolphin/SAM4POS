// PayPalWebViewScreen.js
// React Native screen component that opens a PayPal approval URL in a WebView,
// detects the redirect to your return_url/cancel_url, and calls your backend to capture the order.
// Usage: navigate to this screen with props: { approvalUrl, returnUrl, cancelUrl, backendBase }

import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import HeaderComponent from '../../components/HeaderComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { apiURLs, post } from '../../services/api';

export default function PayPalWebViewScreen({ route }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // Expect route.params to contain:
  // { approvalUrl, returnUrl, cancelUrl, backendBase }
  const {
    approvalUrl,
    returnUrl = 'https://example.com/paypal/success',
    cancelUrl = 'https://example.com/paypal/cancel',
    backendBase,
    transaction_id,
    paypal_order_id,
  } = route?.params || {};

  const webviewRef = useRef(null);
  const [loadingCapture, setLoadingCapture] = useState(false);
  const [approval, setApproval] = useState(approvalUrl || null);

  useEffect(() => {
    if (!approvalUrl) {
      Alert.alert('Error', 'No approvalUrl provided to PayPalWebViewScreen');
      navigation.goBack();
    }
  }, [approvalUrl]);

  const onNavigationStateChange = navState => {
    const { url } = navState;
    if (!url) return;

    if (url.includes('success')) {
      if (!loadingCapture) {
        captureOrder(transaction_id, paypal_order_id);
      }
    } else if (url.includes('cancel')) {
      setApproval(null);
      Alert.alert('Payment cancelled', 'User cancelled the payment');
      navigation.goBack();
    }
  };

  const captureOrder = async (orderId: string, paypalId: string) => {
    setLoadingCapture(true);
    try {
      const form = new FormData();
      form.append('transaction_id', orderId);
      form.append('paypal_order_id', paypalId);
      const response = await post(apiURLs.capture, form);
      console.log('response ===>>> ', response);
    } catch (err) {
      console.error('captureOrder error', err.response);
      Alert.alert('Network error', String(err));
      navigation.goBack();
    } finally {
      setLoadingCapture(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pay with PayPal</Text>
        <View style={{ width: 60 }} />
      </View> */}

      <HeaderComponent
        title="Pay with PayPal"
        onPressBack={() => navigation.dispatch(CommonActions.goBack())}
      />

      {approval ? (
        <WebView
          ref={webviewRef}
          source={{ uri: approval }}
          onNavigationStateChange={onNavigationStateChange}
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          style={styles.webview}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={{ marginBottom: 8 }}>Processing payment...</Text>
          <ActivityIndicator size="large" />
        </View>
      )}

      {loadingCapture && (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 12 }}>Finalizing payment...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  closeButton: { width: 60 },
  closeText: { color: '#0070ba' },
  title: { fontSize: 16, fontWeight: '600' },
  webview: { flex: 1 },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  loadingBox: {
    width: 220,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
