import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Icons } from '../../../assets/icons';
import InputTextComponent from '../../../components/InputTextComponent';
import { PrimaryButton } from '../../../components/PrimaryButton';
import styles from './AddPLUModalStyle';
import { apiURLs, post } from '../../../services/api';
import { colors } from '../../../theme/colors';
import { moderateScale } from '../../../theme/Metrics';
import { FontFamily } from '../../../assets/fonts';
import { useAppSelector } from '../../../redux/hooks';
import { showNotificationMessage } from '../../utils/helperFunction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const isAndroid15 = Platform.OS === 'android' && Platform.Version >= 35;
type PLUData = {
  pluCode: string;
  description: string;
  kpDescription: string;
  group: string;
  price: string;
  stock: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (plu: any) => void;
  initialData?: PLUData | null;
  groupList?: any[];
};

export function AddPLUModal({ visible, onClose, onSave, initialData, groupList }: Props) {
  const { statusGroup, priceLevels }: any = useAppSelector(state => ({
    statusGroup: state?.plu?.statusGroup ?? [],
    priceLevels: state?.plu?.priceLevel ?? [],
  }));
  const [pluCode, setPluCode] = useState('');
  const [description, setDescription] = useState('');
  const [kpDescription, setKpDescription] = useState('');
  const [groupStatus, setGroupStatus] = useState(statusGroup[0]?.value || '');
  const [groupLink1, setGroupLink1] = useState('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [priceLevel, setPriceLevel] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [validMessage, setValidMessage] = useState('');

  useEffect(() => {
    if (!visible) {
      // When modal closes, clear form (optional)
      resetForm();
      return;
    }

    if (initialData?.pluCode) {
      // When modal opens and you have a barcode, set it
      setPluCode(initialData.pluCode);
    } else {
      // When modal opens without initialData, start clean
      resetForm();
    }
  }, [visible, initialData?.pluCode]);

  const toDecimal = (value: string) => {
    if (!value) return '';
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    return num.toFixed(2);
  };

  useEffect(() => {
    setGroupStatus(statusGroup[0]?.value);
    setPriceLevel(priceLevels[0]?.value);
  }, [statusGroup]);

  useEffect(() => {
    if (!pluCode) {
      setValidMessage('');
      return;
    }

    const timer = setTimeout(() => {
      validatePLU(pluCode);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pluCode]);

  const validatePLU = async code => {
    try {
      const response = await post(apiURLs.checkPLU, { plu_code: code });

      if (response?.data?.status === true) {
        setIsValid(true);
        setValidMessage(response?.data?.message);
      } else {
        setIsValid(false);
        setValidMessage(response?.data?.message);
      }
    } catch (error) {
      setValidMessage('');
      setIsValid(false);
    }
  };

  function resetForm() {
    setPluCode('');
    setDescription('');
    setKpDescription('');
    setGroupStatus('');
    setPrice('');
    setStock('');
  }

  function handleDone() {
    if (!pluCode) {
      showNotificationMessage('PLU Code is required.');
      return;
    }

    if (!isValid) {
      showNotificationMessage(
        'PLU Code validation failed. Please enter a valid PLU code.',
      );
      return;
    }

    if (!groupStatus) {
      showNotificationMessage('Group Status is required.');
      return;
    }

    const payload = {
      plu_code: Number(pluCode),
      price_level: priceLevel,
      price_value: Number(toDecimal(price)),
      id_plu_status_group: Number(groupStatus),
      plu_desc: description ?? '',
      stock_qty: Number(toDecimal(stock)),
      str_kp_desc: kpDescription ?? '',
      id_group1: Number(groupLink1) || 0,
    };

    onSave(payload);
  }

  const decimalRegex = /^(?:\d+(\.\d{0,2})?)?$/;

  const handlePriceChange = (text: string) => {
    const digits = text.replace(/\D/g, '');
    if (!digits) {
      setPrice('');
      return;
    }
    const numericValue = parseInt(digits, 10);
    const formatted = (numericValue / 100).toFixed(2);
    setPrice(formatted);
  };

  const handleStockChange = (text: string) => {
    const value = text.replace(/,/g, '');
    if (value === '' || decimalRegex.test(value)) {
      setStock(value);
    }
  };

  const handlePLUCodeChange = (text: string) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    setPluCode(onlyNumbers);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{'Add PLU'}</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Image source={Icons.close} style={styles.closeImage} />
            </Pressable>
          </View>

          {/* Scrollable Form */}
          <KeyboardAwareScrollView
            style={styles.scrollView}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.spacer} />
            <InputTextComponent
              placeholdertext="PLU Code"
              label="PLU Code"
              inputProps={{
                value: pluCode,
                onChangeText: handlePLUCodeChange,
                keyboardType: 'numeric',
              }}
            />
            {validMessage && (
              <Text
                style={{
                  color: isValid ? colors.verified : colors.red2,
                  fontSize: moderateScale(12),
                  fontFamily: FontFamily.medium,
                  fontWeight: '400',
                }}
              >
                {validMessage}
              </Text>
            )}
            <InputTextComponent
              placeholdertext="Description (PLU Name)"
              label="Description (PLU Name)"
              inputProps={{
                value: description,
                onChangeText: setDescription,
              }}
            />


            <InputTextComponent
              label={'Group Link 1'}
              placeholdertext={'Group Link 1'}
              isDropdown={true}
              data={groupList}
              dropdownProps={{
                value: groupLink1,
                onChange: (item: any) => {
                  setGroupLink1(item.value);
                },
              }}
            />
            <InputTextComponent
              label={'Group Status'}
              placeholdertext={'Group Status'}
              isDropdown={true}
              data={statusGroup}
              dropdownProps={{
                value: groupStatus,
                onChange: (item: any) => {
                  setGroupStatus(item.value);
                },
              }}
            />
            <InputTextComponent
              placeholdertext="Stock"
              label="Stock"
              inputProps={{
                value: stock,
                onChangeText: handleStockChange,
                keyboardType: 'numeric',
              }}
            />

            <InputTextComponent
              placeholdertext="Price"
              label="Price"
              inputProps={{
                value: price,
                onChangeText: handlePriceChange,
                keyboardType: 'numeric',
              }}
            />

            <InputTextComponent
              isDropdown={true}
              data={priceLevels}
              label="Price Level"
              placeholdertext="Select price level"
              dropdownProps={{
                value: priceLevel,
                onChange: (item: any) => setPriceLevel(item.value),
                // selectedTextStyle: styles.selectedTextStyle,
              }}
            />
            {/* <InputTextComponent
              placeholdertext="KP Description"
              label="KP Description"
              inputProps={{
                value: kpDescription,
                onChangeText: setKpDescription,
              }}
            /> */}

            <View style={{ height: 20 }} />
          </KeyboardAwareScrollView>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Cancel"
              onPress={onClose}
              style={{ ...styles.button, ...styles.cancelButton }}
              labelStyle={styles.cancelButtonText}
            />
            <PrimaryButton
              title="Done"
              onPress={handleDone}
              style={{ ...styles.button, ...styles.saveButton }}
            />
          </View>
          {/* <PrimaryButton title={'Done'} onPress={handleDone} /> */}
        </View>
      </View>
    </Modal>
  );
}
