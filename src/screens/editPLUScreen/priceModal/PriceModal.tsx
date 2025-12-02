import React, { FC } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import styles from './PriceModalStyle';
import InputTextComponent from '../../../components/InputTextComponent';
import { PrimaryButton } from '../../../components/PrimaryButton';

interface PriceLevelItem {
  label: string;
  value: string;
}

interface PriceModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  price: string;
  setPrice: (value: string) => void;
  level: string;
  setLevel: (value: string) => void;
  levelList: PriceLevelItem[];
  pluCode: string | number;
  description: string;
  isEdit?: boolean;
}

const PriceModal: FC<PriceModalProps> = ({
  visible,
  onClose,
  onSubmit,
  price,
  setPrice,
  level,
  setLevel,
  levelList = [],
  pluCode,
  description,
  isEdit = false,
}) => {
  const decimalRegex = /^(?:\d+(\.\d{0,2})?)?$/;
  const handlePriceChange = (text: string) => {
    const value = text.replace(/,/g, ''); // if any commas come
    if (value === '' || decimalRegex.test(value)) {
      setPrice(value);
    }
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* HEADER */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {isEdit ? 'EDIT' : 'ADD'} - {description} / {pluCode}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <InputTextComponent
            placeholdertext="0.00"
            label="Price"
            inputProps={{
              keyboardType: 'numeric',
              value: price,
              onChangeText: handlePriceChange,
            }}
          />

          <InputTextComponent
            isDropdown={true}
            data={levelList}
            label="PRICE LEVEL"
            placeholdertext="Select price level"
            dropdownProps={{
              value: level,
              onChange: (item: any) => setLevel(item.value),
              //   selectedTextStyle: styles.selectedTextStyle,
            }}
          />

          <View style={styles.buttonRow}>
            <PrimaryButton
              title="CANCEL"
              onPress={onClose}
              style={styles.enterManuallyButton}
              labelStyle={styles.enterManuallyLabel}
            />
            <PrimaryButton
              title={isEdit ? 'SAVE' : 'ADD'}
              onPress={onSubmit}
              style={styles.scanAgainButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PriceModal;
