import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { PrimaryButton } from './PrimaryButton';

type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  pluName: string;
  pluBarcode: string;
};

export function DeletePLUModal({ visible, onClose, onDelete, pluName, pluBarcode }: Props) {
  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <View style={styles.iconContainer}>
            <View style={styles.warningIcon}>
              <Text style={styles.warningText}>!</Text>
            </View>
          </View>

          <Text style={styles.message}>Are you sure you want to delete this PLU?</Text>
          <Text style={styles.pluInfo}>
            {pluName} <Text style={styles.barcodeText}>(Barcode: {pluBarcode})</Text>
          </Text>

          <View style={styles.buttonContainer}>
            <PrimaryButton title="Delete" onPress={onDelete} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: '300',
  },
  iconContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  warningIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {
    fontSize: 36,
    color: '#FF4444',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  pluInfo: {
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  barcodeText: {
    color: '#666',
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
  },
});


