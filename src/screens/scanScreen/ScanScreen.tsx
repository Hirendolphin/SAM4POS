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
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
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
import { apiURLs, get, post } from '../../services/api';
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
import {
  handleAppStateFlags,
  processBarcode,
  showNotificationMessage,
  handleApiError,
} from '../utils/helperFunction';
import { userForceLogout } from '../../redux/actions/authAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getPLU,
  getPriceLevel,
  getStatusGroup,
} from '../../redux/actions/pluAction';
import { getGroupList } from '../../redux/actions/pluAction';
import ProgressModal from '../../components/ProgressModal';
const isAndroid15 = Platform.OS === 'android' && Platform.Version >= 35;
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
  const [isScanning, setIsScanning] = useState(true);
  const [productFound, setProductFound] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [isFlash, setIsFlash] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { hasPermission } = useCameraPermission();
  const [loading, setLoading] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const groupList: any[] = useAppSelector(state => state?.plu?.groupList ?? []);

  const { barcodeSettings }: any = useAppSelector(state => ({
    barcodeSettings: state?.barcodeSetting || {},
  }));

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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

  useFocusEffect(
    useCallback(() => {
      getGroupListApi();
    }, []),
  );

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Error', 'Unable to open app settings.');
    });
  };

  const getpluAPI = async () => {
    await dispatch(getPLU({ page: 1, limit: 10, search: '' }));
  };

  const getGroupListApi = async () => {
    try {
      await dispatch(getGroupList()).unwrap();
    } catch (error: any) {
      handleApiError(error, dispatch as any);
    }
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
      if (!isScanning) return;
      setIsScanning(false);

      let scannedCode = codes?.[0]?.value?.toString() || '';
      const codeType = codes?.[0]?.type;
      console.log('codeType ==>> ', codeType);

      // console.log('codes ==>>', codes?.[0]);

      // if (scannedCode.length === 13 && scannedCode.startsWith('0')) {
      //   scannedCode = scannedCode.substring(1);
      // }

      // scannedCode = scannedCode.replace(/^0+/, '');
      scannedCode = processBarcode(scannedCode, codeType, barcodeSettings);

      console.log('scannedCode ==>> ', scannedCode);

      try {
        const response = await post(apiURLs.pluScan, { plu_code: scannedCode });
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
      if (Platform.OS == 'android') {
        setLoading(true);
      }
      const response = await post(apiURLs?.addPlu, plu);
      showNotificationMessage(response?.data?.message);
      if (response?.data?.status) {
        setAddModalVisible(false);
        setProductFound(false);
        setProductNotFound(false);
        setTimeout(async () => {
          await getpluAPI();
          navigation.dispatch(
            CommonActions.navigate({
              name: Routes.dashboard,
            }),
          );
        }, 500);
      }
    } catch (error) {
      handleApiError(error, dispatch as any);
    } finally {
      setLoading(false);
      setBarcode('');
    }
  };

  // const handlePermissions = async () => {
  //   try {
  //     const checkMultipleResponse = await checkMultiple([
  //       PERMISSIONS.IOS.CAMERA,
  //       PERMISSIONS.ANDROID.CAMERA,
  //     ]);

  //     const checkMultipleResponseState =
  //       (GlobalMetrics.isIos &&
  //         checkMultipleResponse[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED) ||
  //       (GlobalMetrics.isAndroid &&
  //         checkMultipleResponse[PERMISSIONS.ANDROID.CAMERA] ===
  //           RESULTS.GRANTED);

  //     if (!checkMultipleResponseState) {
  //       const requestMultipleResponse = await requestMultiple([
  //         PERMISSIONS.IOS.CAMERA,
  //         PERMISSIONS.ANDROID.CAMERA,
  //       ]);

  //       const requestMultipleResponseState =
  //         (GlobalMetrics.isIos &&
  //           requestMultipleResponse[PERMISSIONS.IOS.CAMERA] ===
  //             RESULTS.GRANTED) ||
  //         (GlobalMetrics.isAndroid &&
  //           requestMultipleResponse[PERMISSIONS.ANDROID.CAMERA] ===
  //             RESULTS.GRANTED);

  //       if (!requestMultipleResponseState) {
  //         setPermissionModalVisible(true);
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     } else {
  //       return true;
  //     }
  //   } catch (err) {
  //     return false;
  //   }
  // };

  const handlePermissions = async () => {
    try {
      // Platform-specific permission
      const permission = GlobalMetrics.isIos
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

      // 1️⃣ Check permission
      const checkResponse = await checkMultiple([permission]);
      const isGranted = checkResponse[permission] === RESULTS.GRANTED;

      if (isGranted) {
        return true;
      }

      // 2️⃣ Request permission
      const requestResponse = await requestMultiple([permission]);
      const isRequestGranted = requestResponse[permission] === RESULTS.GRANTED;

      if (!isRequestGranted) {
        setPermissionModalVisible(true);
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  };

  const getBottomOffset = () => {
    if (Platform.OS === 'android') {
      if (!isAndroid15) {
        return verticalScale(0);
      }
    }
    if (!keyboardHeight) {
      return verticalScale(15);
    }

    if (Platform.OS === 'ios') {
      return keyboardHeight - verticalScale(50);
    }

    // Android 15+ safe adjustment
    return Math.max(keyboardHeight - verticalScale(20), verticalScale(10));
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
              isActive={addModalVisible ? false : isScanning}
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
          <View
            style={[
              styles.bottomContainer,
              {
                bottom: getBottomOffset(),
              },
            ]}
          >
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
                    returnKeyType: 'done',
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
            setProductFound(false);
            setProductNotFound(false);
          }}
          onSave={handleSavePLU}
          initialData={barcode ? { pluCode: barcode } : null}
          groupList={groupList}
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
