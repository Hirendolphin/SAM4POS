import React, { FC } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './StockModalStyle';
import InputTextComponent from '../../../components/InputTextComponent';
import { PrimaryButton } from '../../../components/PrimaryButton';

interface StockModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  stock: number | string;
  setStock: (value: number | string) => void;
}

const StockModal: FC<StockModalProps> = ({
  visible,
  onClose,
  onSubmit,
  setStock,
  stock,
}) => {
  const decimalRegex = /^(?:\d+(\.\d{0,2})?)?$/;

  const handleStockChange = (text: string) => {
    const value = text.replace(/,/g, '');
    if (value === '' || decimalRegex.test(value)) {
      setStock(value);
    }
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* HEADER */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Stock</Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <InputTextComponent
            placeholdertext="0.00"
            label="Stock"
            inputProps={{
              keyboardType: 'numeric',
              value: stock.toString(),
              onChangeText: handleStockChange,
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
              title={'SAVE'}
              onPress={onSubmit}
              style={styles.scanAgainButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StockModal;
