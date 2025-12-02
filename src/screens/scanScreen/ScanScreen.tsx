import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { Icons } from '../../assets/icons';
import InputTextComponent from '../../components/InputTextComponent';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import {
  GlobalMetrics,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme/Metrics';
import styles from './ScanScreenStyle';
import { apiURLs, post } from '../../services/api';
import { PLUItem } from '../../redux/dataTypes';
import { AddPLUModal } from '../dashboardScreen/addPLUModal/AddPLUModal';
import { Routes } from '../../constants';
import PermissionModal from '../../components/PermissionModal';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import axios from 'axios';
import { showNotificationMessage } from '../utils/helperFunction';
import { userForceLogout } from '../../redux/actions/authAction';
import { useAppDispatch } from '../../redux/hooks';
import {
  getPLU,
  getPriceLevel,
  getStatusGroup,
} from '../../redux/actions/pluAction';
import ProgressModal from '../../components/ProgressModal';

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
  const dispatch = useAppDispatch();
  const [torchOn, setTorchOn] = useState(false);
  const frontDevice = useCameraDevice('front');
  const backDevice = useCameraDevice('back');
  const [cameraDevice, setCameraDevice] = useState<CameraDevice | undefined>(
    backDevice,
  );
  const [scannedProduct, setScannedProduct] = useState<PLUItem | null>(null);
  const [barcode, setBarcode] = useState<string>('');
  const [showProduct, setShowProduct] = useState(true);
  const [isScanning, setIsScanning] = useState(true);
  const [productFound, setProductFound] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [isFlash, setIsFlash] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { hasPermission } = useCameraPermission();
  const [loading, setLoading] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const permissionState = await handlePermissions();
        if (permissionState && cameraDevice && hasPermission) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      })();
      return () => {
        setProductFound(false);
        setProductNotFound(false);
        setIsActive(false);
      };
    }, [cameraDevice, hasPermission]),
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     setProductFound(false);
  //     setProductNotFound(false);
  //   }, []),
  // );

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Error', 'Unable to open app settings.');
    });
  };

  const getpluAPI = async () => {
    await dispatch(getPLU({ page: 1, limit: 10, search: '' }));
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
      console.log('code ==>', codes);

      if (!isScanning) return;
      setIsScanning(false);

      const scannedCode = codes?.[0]?.value;
      console.log('Scanned Code:', scannedCode);

      try {
        const response = await post(apiURLs.pluScan, { plu_code: scannedCode });
        console.log('response', response);
        if (response?.data?.status) {
          setProductFound(true);
          setProductNotFound(false);
          setScannedProduct(response?.data?.data);
        }
      } catch (error) {
        setBarcode(scannedCode?.toString() || '');
        setProductNotFound(true);
        setProductFound(false);
      }
      setTimeout(() => setIsScanning(true), 3000);
    },
  });

  const handleSavePLU = async (plu: any) => {
    try {
      setLoading(true);
      const response = await post(apiURLs?.addPlu, plu);
      showNotificationMessage(response?.data?.message);
      if (response?.data?.status) {
        setAddModalVisible(false);
        setTimeout(async () => {
          await getpluAPI();
        }, 500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          dispatch(userForceLogout({ forcelogout: true }));
        } else if (typeof error.response?.data?.error === 'string') {
          showNotificationMessage(error.response.data.error);
        }
      }
    } finally {
      setLoading(false);
      setBarcode('');
    }
  };

  const handlePermissions = async () => {
    try {
      const checkMultipleResponse = await checkMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.ANDROID.CAMERA,
      ]);

      const checkMultipleResponseState =
        (GlobalMetrics.isIos &&
          checkMultipleResponse[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED) ||
        (GlobalMetrics.isAndroid &&
          checkMultipleResponse[PERMISSIONS.ANDROID.CAMERA] ===
            RESULTS.GRANTED);

      if (!checkMultipleResponseState) {
        const requestMultipleResponse = await requestMultiple([
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.ANDROID.CAMERA,
        ]);

        const requestMultipleResponseState =
          (GlobalMetrics.isIos &&
            requestMultipleResponse[PERMISSIONS.IOS.CAMERA] ===
              RESULTS.GRANTED) ||
          (GlobalMetrics.isAndroid &&
            requestMultipleResponse[PERMISSIONS.ANDROID.CAMERA] ===
              RESULTS.GRANTED);

        if (!requestMultipleResponseState) {
          setPermissionModalVisible(true);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {isActive && (
          <Pressable
            style={styles.flashButton}
            onPress={() => setIsFlash(!isFlash)}
          >
            <Image source={isFlash ? Icons.flashOn : Icons.flashOff} />
          </Pressable>
        )}

        {isActive && cameraDevice ? (
          <View style={styles.cameraView}>
            <Camera
              style={StyleSheet.absoluteFill}
              device={cameraDevice}
              isActive={isScanning}
              codeScanner={codeScanner}
              lowLightBoost={cameraDevice?.supportsLowLightBoost}
              enableZoomGesture={true}
              torch={isFlash ? 'on' : 'off'}
            />
            <View
              style={{
                // flex: 1,
                position: 'absolute',
                left: 0,
                right: 0,
                top: moderateScale(200),
              }}
              pointerEvents="none"
            >
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
        ) : (
          <View
            style={[
              StyleSheet.absoluteFill,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                paddingHorizontal: 16,
              }}
            >
              Camera permission is not granted. Please allow access to use the
              scanner.
            </Text>
          </View>
        )}

        {isActive && (
          <Text style={styles.alignText}>Align barcode within the frame</Text>
        )}
        {isActive && (
          <View style={styles.bottomContainer}>
            {!productFound && !productNotFound && (
              <View>
                <InputTextComponent
                  placeholdertext="Enter Code Manually"
                  inputProps={{
                    value: barcode,
                    onChangeText(text) {
                      setBarcode(text);
                    },
                    keyboardType: 'numeric',
                  }}
                />
                <PrimaryButton
                  title="Add New PLU"
                  onPress={async () => {
                    setAddModalVisible(true);
                    await dispatch(getPriceLevel()).unwrap();
                    await dispatch(getStatusGroup()).unwrap();
                    // setBarcode('');
                  }}
                  style={styles.enterButton}
                />
              </View>
            )}

            {productFound && (
              <View>
                <View style={styles.productCard}>
                  <Text style={styles.productName}>
                    {scannedProduct?.plu_desc}
                  </Text>
                  <View style={styles.divider} />
                  <Row
                    label="Barcode :"
                    value={scannedProduct?.plu_code || ''}
                  />
                </View>
                <PrimaryButton
                  title="Edit"
                  onPress={() => {
                    setProductFound(false);
                    setScannedProduct(null);
                    navigation.dispatch(
                      CommonActions.navigate({
                        name: Routes.editPLUScreen,
                        params: {
                          pluData: scannedProduct,
                        },
                      }),
                    );
                  }}
                  style={styles.addButton}
                />
              </View>
            )}

            {productNotFound && (
              <View>
                <View style={styles.noMatchCard}>
                  <Text style={styles.noMatchText}>{barcode}</Text>
                  <Text style={styles.noMatchText}>
                    No match found. Add new PLU?
                  </Text>
                </View>
                <View style={styles.buttonRow}>
                  <PrimaryButton
                    title="Enter Manually"
                    onPress={() => {
                      // setBarcode('');
                      setProductFound(false);
                      setProductNotFound(false);
                    }}
                    style={styles.enterManuallyButton}
                    labelStyle={styles.enterManuallyLabel}
                  />
                  <PrimaryButton
                    title="Add PLU"
                    onPress={async () => {
                      setAddModalVisible(true);
                      // setBarcode('');
                      setProductNotFound(false);
                      await dispatch(getPriceLevel()).unwrap();
                      await dispatch(getStatusGroup()).unwrap();
                    }}
                    style={styles.scanAgainButton}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
      {!loading && addModalVisible && (
        <AddPLUModal
          visible={addModalVisible}
          onClose={() => {
            setAddModalVisible(false);
            setBarcode('');
          }}
          onSave={handleSavePLU}
          initialData={barcode ? { pluCode: barcode } : null}
        />
      )}
      {loading && <ProgressModal ismodelVisible={loading} label="Adding PLU" />}
      <PermissionModal
        visible={permissionModalVisible}
        onRequestAgain={() => setPermissionModalVisible(false)}
        onOpenSettings={openAppSettings}
      />
    </View>
  );
}
