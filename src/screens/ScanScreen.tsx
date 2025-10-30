import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { PrimaryButton } from '../components/PrimaryButton';

type TabNavigationProp = BottomTabNavigationProp<any>;

export default function ScanScreen() {
  const navigation = useNavigation<TabNavigationProp>();
  const [torchOn, setTorchOn] = useState(false);
  const [scannedProduct, setScannedProduct] = useState({
    name: 'Coca-Cola 500ml',
    barcode: '0123456789123',
    price: '$1.50',
  });
  const [showProduct, setShowProduct] = useState(true);

  const toggleTorch = () => {
    setTorchOn(!torchOn);
  };

  const handleAddProduct = () => {
    console.log('Add product:', scannedProduct);
    
    // Show alert dialog
    Alert.alert(
      'Scan Complete',
      'Do you want to scan other item or go to Dashboard?',
      [
        {
          text: 'Yes',
          onPress: () => {
            // Continue scanning - hide the current product card
            setShowProduct(false);
            // Simulate ready for next scan
            setTimeout(() => {
              setShowProduct(true);
            }, 500);
          },
        },
        {
          text: 'No',
          onPress: () => {
            // Navigate to Dashboard
            navigation.navigate('Dashboard' as never);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>SAM4POS</Text>
      </View>

      {/* Camera View (Simulated with dark background) */}
      <View style={styles.cameraContainer}>
        {/* Torch Button */}
        <Pressable style={styles.torchBtn} onPress={toggleTorch}>
          <Text style={styles.torchIcon}>{torchOn ? '💡' : '🔦'}</Text>
        </Pressable>

        {/* Scanner Frame */}
        <View style={styles.scannerFrame}>
          {/* Top Left Corner */}
          <View style={[styles.corner, styles.topLeft]} />
          {/* Top Right Corner */}
          <View style={[styles.corner, styles.topRight]} />
          {/* Bottom Left Corner */}
          <View style={[styles.corner, styles.bottomLeft]} />
          {/* Bottom Right Corner */}
          <View style={[styles.corner, styles.bottomRight]} />
          
          {/* Scanning Line */}
          <View style={styles.scanLine} />
        </View>

        {/* Instruction Text */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>Align barcode within the frame</Text>
        </View>
      </View>

      {/* Product Info Card */}
      {showProduct && (
        <View style={styles.productCard}>
          <Text style={styles.productName}>{scannedProduct.name}</Text>
          <View style={styles.separator} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Barcode :</Text>
            <Text style={styles.infoValue}>{scannedProduct.barcode}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Price :</Text>
            <Text style={styles.infoValue}>{scannedProduct.price}</Text>
          </View>
          <PrimaryButton title="Add" onPress={handleAddProduct} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  brand: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1a1a1a',
  },
  torchBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  torchIcon: {
    fontSize: 28,
  },
  scannerFrame: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderColor: '#fff',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: colors.primary,
    opacity: 0.8,
  },
  instructionContainer: {
    position: 'absolute',
    bottom: -80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  productCard: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  infoValue: {
    fontSize: 15,
    color: '#666',
  },
});
