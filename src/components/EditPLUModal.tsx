import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { colors } from '../theme/colors';
import { PrimaryButton } from './PrimaryButton';

type PLUData = {
  code: string;
  name: string;
  kpDescription: string;
  group: string;
  price: string;
  stock: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (plu: PLUData) => void;
  initialData: PLUData;
};

export function EditPLUModal({ visible, onClose, onSave, initialData }: Props) {
  const [pluCode, setPluCode] = useState('');
  const [description, setDescription] = useState('');
  const [kpDescription, setKpDescription] = useState('');
  const [group, setGroup] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  // Load initial data when modal opens
  useEffect(() => {
    if (visible && initialData) {
      setPluCode(initialData.code || '');
      setDescription(initialData.name || '');
      setKpDescription(initialData.kpDescription || '');
      setGroup(initialData.group || '');
      setPrice(initialData.price || '');
      setStock(initialData.stock || '');
    }
  }, [visible, initialData]);

  function handleDone() {
    onSave({ 
      code: pluCode, 
      name: description, 
      kpDescription, 
      group, 
      price, 
      stock 
    });
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Edit PLU</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          {/* Scrollable Form */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>PLU Code</Text>
            <TextInput
              style={styles.input}
              placeholder="PLU Code"
              placeholderTextColor="#B0B0B0"
              value={pluCode}
              onChangeText={setPluCode}
            />

            <View style={styles.spacer} />
            <Text style={styles.label}>Description (PLU Name)</Text>
            <TextInput
              style={styles.input}
              placeholder="Description (PLU Name)"
              placeholderTextColor="#B0B0B0"
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.spacer} />
            <Text style={styles.label}>KP Description</Text>
            <TextInput
              style={styles.input}
              placeholder="KP Description"
              placeholderTextColor="#B0B0B0"
              value={kpDescription}
              onChangeText={setKpDescription}
              multiline
            />

            <View style={styles.spacer} />
            <Text style={styles.label}>Group</Text>
            <Pressable
              style={styles.dropdown}
              onPress={() => setShowGroupDropdown(!showGroupDropdown)}
            >
              <Text style={group ? styles.dropdownText : styles.dropdownPlaceholder}>
                {group || 'Group'}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </Pressable>
            {showGroupDropdown && (
              <View style={styles.dropdownMenu}>
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => {
                    setGroup('Food');
                    setShowGroupDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>Food</Text>
                </Pressable>
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => {
                    setGroup('Beverage');
                    setShowGroupDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>Beverage</Text>
                </Pressable>
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => {
                    setGroup('Group 2');
                    setShowGroupDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>Group 2</Text>
                </Pressable>
                <Pressable
                  style={[styles.dropdownItem, { borderBottomWidth: 0 }]}
                  onPress={() => {
                    setGroup('Dessert');
                    setShowGroupDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>Dessert</Text>
                </Pressable>
              </View>
            )}

            <View style={styles.spacer} />
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Price"
              placeholderTextColor="#B0B0B0"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />

            <View style={styles.spacer} />
            <Text style={styles.label}>Stock</Text>
            <TextInput
              style={styles.input}
              placeholder="Stock"
              placeholderTextColor="#B0B0B0"
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
            />
            <View style={{ height: 20 }} />
          </ScrollView>

          {/* Fixed Button */}
          <View style={styles.buttonWrapper}>
            <PrimaryButton title="Done" onPress={handleDone} />
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
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxHeight: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
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
  scrollView: {
    paddingHorizontal: 20,
    maxHeight: 500,
  },
  spacer: {
    height: 12,
  },
  label: {
    color: '#4A4A4A',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#1F1F1F',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  dropdown: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  dropdownText: {
    fontSize: 14,
    color: '#1F1F1F',
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#666',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1F1F1F',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
});


