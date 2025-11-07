import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { Icons } from '../../../assets/icons';
import InputTextComponent from '../../../components/InputTextComponent';
import { PrimaryButton } from '../../../components/PrimaryButton';
import styles from './AddPLUModalStyle';

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
  const isEditMode = !!initialData;
  const [pluCode, setPluCode] = useState('');
  const [description, setDescription] = useState('');
  const [kpDescription, setKpDescription] = useState('');
  const [group, setGroup] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (initialData) {
      setPluCode(initialData.pluCode);
      setDescription(initialData.description);
      setKpDescription(initialData.kpDescription);
      setGroup(initialData.group);
      setPrice(initialData.price);
      setStock(initialData.stock);
    } else {
      resetForm();
    }
  }, [initialData, visible]);

  function resetForm() {
    setPluCode('');
    setDescription('');
    setKpDescription('');
    setGroup('');
    setPrice('');
    setStock('');
  }

  function handleDone() {
    onSave({ pluCode, description, kpDescription, group, price, stock });
    resetForm();
    onClose();
  }

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
            <Text style={styles.title}>
              {isEditMode ? 'Edit PLU' : 'Add PLU'}
            </Text>
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
                onChangeText: setPluCode,
              }}
            />
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
              label={'Group'}
              placeholdertext={'Group'}
              isDropdown={true}
              data={[
                { label: 'Group 1', value: 'Group 1' },
                { label: 'Group 2', value: 'Group 2' },
                { label: 'Group 3', value: 'Group 3' },
              ]}
              dropdownProps={{
                value: group,
                onChange: (item: any) => {
                  setGroup(item.label);
                },
              }}
            />

            <InputTextComponent
              placeholdertext="Price"
              label="Price"
              inputProps={{
                value: price,
                onChangeText: setPrice,
                keyboardType: 'numeric',
              }}
            />

            <InputTextComponent
              placeholdertext="Stock"
              label="Stock"
              inputProps={{
                value: price,
                onChangeText: setStock,
                keyboardType: 'numeric',
              }}
            />

            <View style={{ height: 20 }} />
          </ScrollView>

          <PrimaryButton
            title={isEditMode ? 'Save Changes' : 'Done'}
            onPress={handleDone}
          />
        </View>
      </View>
    </Modal>
  );
}
