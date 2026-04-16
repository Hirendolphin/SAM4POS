import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import styles from './HomeScreenStyle';
import { Icons } from '../../assets/icons';
import { AddPLUModal } from '../dashboardScreen/addPLUModal/AddPLUModal';
import ProgressModal from '../../components/ProgressModal';
import HomeScreenController from './HomeScreenController';

export default function HomeScreen() {
  const {
    addModalVisible,
    setAddModalVisible,
    loading,
    loadingMessage,
    groupList,
    handleSavePLU,
    openAddModal,
    navigateToDashboard,
    navigateToSyncManagement,
    navigateToScan,
    Modal,
  } = HomeScreenController();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>

      <Pressable style={styles.card} onPress={navigateToDashboard}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Search, Edit and Delete PLU</Text>
          <Text style={styles.cardSubtitle}>
            Search, modify and delete existing products
          </Text>
        </View>
        <Image
          source={Icons.rightArrow}
          style={styles.iconImage}
          resizeMode="contain"
        />
      </Pressable>

      <Pressable style={styles.card} onPress={navigateToScan}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Scan to Add/Edit PLU</Text>
          <Text style={styles.cardSubtitle}>Scan barcode to quickly add or edit</Text>
        </View>
        <Image source={Icons.scan} style={styles.iconImage} />
      </Pressable>

      <Pressable style={styles.card} onPress={openAddModal}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Add PLU Manually</Text>
          <Text style={styles.cardSubtitle}>Manually enter PLU details</Text>
        </View>
        <Image source={Icons.add} style={styles.iconImage} />
      </Pressable>

      <Pressable style={styles.card} onPress={navigateToSyncManagement}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Pending Changes</Text>
          <Text style={styles.cardSubtitle}>Sync modified PLUs to POS</Text>
        </View>
        <Image source={Icons.refresh} style={styles.iconImage} />
      </Pressable>

      {!loading && addModalVisible && (
        <AddPLUModal
          visible={addModalVisible}
          onClose={() => setAddModalVisible(false)}
          groupList={groupList}
          onSave={handleSavePLU}
        />
      )}

      {loading && (
        <ProgressModal
          ismodelVisible={loading}
          label={loadingMessage || 'Loading'}
        />
      )}
      {Modal}
    </View>
  );
}
