import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { Icons } from '../../assets/icons';
import InputTextComponent from '../../components/InputTextComponent';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme/Metrics';
import styles from './ScanScreenStyle';

type TabNavigationProp = BottomTabNavigationProp<any>;

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowKey}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function ScanScreen() {
  const navigation = useNavigation<TabNavigationProp>();
  const [torchOn, setTorchOn] = useState(false);
  const frontDevice = useCameraDevice('front');
  const backDevice = useCameraDevice('back');
  const [cameraDevice, setCameraDevice] = useState<CameraDevice | undefined>(
    backDevice,
  );
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
    Alert.alert(
      'Scan Complete',
      'Do you want to scan other item or go to Dashboard?',
      [
        {
          text: 'Yes',
          onPress: () => {
            setShowProduct(false);
            setTimeout(() => {
              setShowProduct(true);
            }, 500);
          },
        },
        {
          text: 'No',
          onPress: () => {
            navigation.navigate('Dashboard' as never);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const codeScanner = useCodeScanner({
    codeTypes: [
      'ean-13',
      'ean-8',
      'upc-a',
      'upc-e',
      'code-39',
      'code-128',
      'code-93',
    ],
    onCodeScanned: async codes => {
      console.log('codes ==>> ', codes);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Pressable style={styles.flashButton}>
          <Image source={Icons.flashOn} />
        </Pressable>

        <View style={styles.cameraView}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={cameraDevice}
            isActive={true}
            codeScanner={codeScanner}
            lowLightBoost={cameraDevice?.supportsLowLightBoost}
            enableZoomGesture={true}
          />
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <BarcodeMask
              outerMaskOpacity={0}
              width={horizontalScale(320)}
              height={verticalScale(240)}
              edgeRadius={moderateScale(16)}
              edgeWidth={moderateScale(80)}
              edgeHeight={moderateScale(80)}
              edgeBorderWidth={moderateScale(3)}
              animatedLineHeight={verticalScale(3)}
              animatedLineColor={colors.white}
              edgeColor={colors.white}
            />
          </View>
        </View>

        <Text style={styles.alignText}>Align barcode within the frame</Text>

        <View style={styles.bottomContainer}>
          <View>
            <InputTextComponent placeholdertext="Enter Code Manually" />
            <PrimaryButton
              title="Enter"
              onPress={() => {}}
              style={styles.enterButton}
            />
          </View>

          {/* <View>
            <View style={styles.productCard}>
              <Text style={styles.productName}>Coca-Cola 500ml</Text>
              <View style={styles.divider} />
              <Row label="Barcode :" value={'0123456789123'} />
              <Row label="Price :" value={'$1.50'} />
            </View>
            <PrimaryButton
              title="Add"
              onPress={() => {}}
              style={styles.addButton}
            />
          </View> */}

          {/* <View>
            <View style={styles.noMatchCard}>
              <Text style={styles.noMatchText}>
                No match found. Add new PLU?
              </Text>
            </View>
            <View style={styles.buttonRow}>
              <PrimaryButton
                title="Enter Manually"
                onPress={() => {}}
                style={styles.enterManuallyButton}
                labelStyle={styles.enterManuallyLabel}
              />
              <PrimaryButton
                title="Scan Again"
                onPress={() => {}}
                style={styles.scanAgainButton}
              />
            </View>
          </View> */}
        </View>
      </View>
    </View>
  );
}
