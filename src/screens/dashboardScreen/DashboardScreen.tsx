import React, { useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { Icons } from '../../assets/icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import { AddPLUModal } from './addPLUModal/AddPLUModal';
import styles from './DashboardScreenStyle';
import { DeletePLUModal } from './deletePLUModal/DeletePLUModal';
import PLUProductsCard from './pluProductsCard/PLUProductsCard';

type PLU = {
  id: string;
  code: string;
  name: string;
  group: string;
  price: string;
  stock: number;
  kpDescription: string;
};

const SAMPLE_PLUS: PLU[] = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  code: String(900000 + i),
  name: 'Lorem Ipsum',
  group: `Group ${1 + (i % 3)}`,
  price: `$ ${(30 + i).toString()}`,
  stock: 5 + (i % 4),
  kpDescription:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}));

export default function DashboardScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPLU, setSelectedPLU] = useState<PLU | null>(null);

  function handleSavePLU(plu: any) {
    console.log('Add PLU:', plu);
  }

  function handleEditPLU(plu: any) {
    console.log('Edit PLU:', plu);
    setEditModalVisible(false);
  }

  function handleDeletePLU() {
    console.log('Delete PLU:', selectedPLU);
    setDeleteModalVisible(false);
    setSelectedPLU(null);
  }

  function openEditModal(item: PLU) {
    setSelectedPLU(item);
    setEditModalVisible(true);
  }

  function openDeleteModal(item: PLU) {
    setSelectedPLU(item);
    setDeleteModalVisible(true);
  }

  return (
    <View style={styles.container}>
      {/* Plan Card */}
      <View style={styles.freeCard}>
        <View style={styles.row}>
          <View style={styles.rowFlex}>
            <Image source={Icons.premium} style={styles.iconSmall} />
            <Text style={styles.freeText}>Standard Plan</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.freeDesc}>
          Standard Plan – Active until 22 Oct 2025
        </Text>
        <PrimaryButton
          title="Manage Subscription"
          onPress={() => {}}
          style={styles.manageBtn}
        />
      </View>

      {/* Last Sync Section */}
      <View style={styles.lastSyncContainer}>
        <Text style={styles.lastSyncText}>Last Sync: 22 Sep 2025, 4:32 PM</Text>
        <View style={styles.refreshButton}>
          <Image source={Icons.refresh} style={styles.refreshIcon} />
        </View>
      </View>

      {/* Header Section */}
      <View style={styles.pluHeader}>
        <Text style={styles.pluHeaderText}>PLU Products</Text>
      </View>

      {/* PLU List */}
      <FlatList
        data={SAMPLE_PLUS}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <PLUProductsCard
            item={item}
            openDeleteModal={openDeleteModal}
            openEditModal={openEditModal}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Add PLU Button */}
      <Pressable
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Image source={Icons.add} style={styles.addIcon} />
        <Text style={styles.addText}>Add PLU</Text>
      </Pressable>

      {/* Modals */}
      <AddPLUModal
        visible={addModalVisible || editModalVisible}
        onClose={() => {
          setAddModalVisible(false);
          setEditModalVisible(false);
        }}
        onSave={editModalVisible ? handleEditPLU : handleSavePLU}
        initialData={
          editModalVisible && selectedPLU
            ? {
                pluCode: selectedPLU.code,
                description: selectedPLU.name,
                kpDescription: selectedPLU.kpDescription,
                group: selectedPLU.group,
                price: selectedPLU.price,
                stock: String(selectedPLU.stock),
              }
            : null
        }
      />

      {selectedPLU && (
        <DeletePLUModal
          visible={deleteModalVisible}
          onClose={() => {
            setDeleteModalVisible(false);
            setSelectedPLU(null);
          }}
          onDelete={handleDeletePLU}
          pluName={selectedPLU.name}
          pluBarcode={selectedPLU.code}
        />
      )}
    </View>
  );
}
