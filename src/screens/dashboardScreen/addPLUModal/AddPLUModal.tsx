import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Text, View } from 'react-native';
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
};

export function AddPLUModal({ visible, onClose, onSave, initialData }: Props) {
  const { statusGroup, priceLevels }: any = useAppSelector(state => ({
    statusGroup: state?.plu?.statusGroup ?? [],
    priceLevels: state?.plu?.priceLevel ?? [],
  }));
  const [pluCode, setPluCode] = useState('');
  const [description, setDescription] = useState('');
  const [kpDescription, setKpDescription] = useState('');
  const [groupStatus, setGroupStatus] = useState(statusGroup[0]?.value || '');
  const [price, setPrice] = useState('0.00');
  const [stock, setStock] = useState('0.00');
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
    if (!value) return '0.00';
    const num = parseFloat(value);
    if (isNaN(num)) return '0.00';
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
    setPrice('0.00');
    setStock('0.00');
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
    };

    onSave(payload);
  }

  const decimalRegex = /^(?:\d+(\.\d{0,2})?)?$/;

  const handlePriceChange = (text: string) => {
    const value = text.replace(/,/g, '');
    if (value === '' || decimalRegex.test(value)) {
      setPrice(value);
    }
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
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
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
              placeholdertext="KP Description"
              label="KP Description"
              inputProps={{
                value: kpDescription,
                onChangeText: setKpDescription,
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

            <View style={{ height: 20 }} />
          </ScrollView>

          <PrimaryButton title={'Done'} onPress={handleDone} />
        </View>
      </View>
    </Modal>
  );
}
