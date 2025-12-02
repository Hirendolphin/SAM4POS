import React from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import { Icons } from '../../../assets/icons';
import { PrimaryButton } from '../../../components/PrimaryButton';
import styles from './DeletePLUModalStyle';

type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  pluName: string;
  pluBarcode: string;
};

export function DeletePLUModal({
  visible,
  onClose,
  onDelete,
  pluName,
  pluBarcode,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Image source={Icons.close} style={styles.closeImage} />
          </Pressable>

          <Image source={Icons.warning} style={styles.warningImage} />

          <Text style={styles.message}>
            Are you sure you want to delete this PLU?
          </Text>
          <Text style={styles.barcodeText}>
            {pluName} (PLU code: {pluBarcode})
          </Text>

          <PrimaryButton
            title="Delete"
            onPress={onDelete}
            style={styles.buttonContainer}
          />
        </View>
      </View>
    </Modal>
  );
}
