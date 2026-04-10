import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { Icons } from '../../assets/icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import { AddPLUModal } from './addPLUModal/AddPLUModal';
import DashboardController from './DashboardController';
import styles from './DashboardScreenStyle';
import { DeletePLUModal } from './deletePLUModal/DeletePLUModal';
import PLUProductsCard from './pluProductsCard/PLUProductsCard';
import { getPriceLevel, getStatusGroup } from '../../redux/actions/pluAction';
import ProgressModal from '../../components/ProgressModal';
import EmptyListComponent from '../../components/EmptyListComponent';
import InputTextComponent from '../../components/InputTextComponent';
import { moderateScale } from '../../theme/Metrics';

import HeaderComponent from '../../components/HeaderComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const {
    userDetails,
    openDeleteModal,
    setSelectedPLU,
    openEditModal,
    handleDeletePLU,
    setAddModalVisible,
    addModalVisible,
    handleSavePLU,
    selectedPLU,
    deleteModalVisible,
    setDeleteModalVisible,
    pluList,
    handleLoadMore,
    fetching,
    dispatch,
    loadingMore,
    loading,
    search,
    setSearch,
    lastSync,
    getposDetails,
    groupList
  } = DashboardController();

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="PLU List"
        onPressBack={() => navigation.dispatch(CommonActions.goBack())}
      />
      <View style={styles.content}>
        {/* Plan Card */}
        {userDetails?.data?.subscription_status == 'Active' && (
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
              onPress={() => { }}
              style={styles.manageBtn}
            />
          </View>
        )}

        {/* Last Sync Section */}
        <View style={styles.lastSyncContainer}>
          <Text style={styles.lastSyncText}>Last Sync: {lastSync}</Text>
          <Pressable style={styles.refreshButton} onPress={getposDetails}>
            <Image source={Icons.refresh} style={styles.refreshIcon} />
          </Pressable>
        </View>

        <InputTextComponent
          placeholdertext="Search PLU"
          inputProps={{
            value: search,
            onChangeText: (text: string) => {
              setSearch(text || '');
            },
          }}
        />
        {/* Header Section */}
        <View style={styles.pluHeader}>
          <Text style={styles.pluHeaderText}>PLU Products</Text>
        </View>

        {/* PLU List */}
        <FlatList
          data={pluList.results}
          keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PLUProductsCard
              item={item}
              openDeleteModal={openDeleteModal}
              openEditModal={openEditModal}
            />
          )}
          contentContainerStyle={{ paddingBottom: moderateScale(200) }}
          ListEmptyComponent={<EmptyListComponent message="No PLU data Found" />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
        />



        {/* Modals */}
        {!loading && addModalVisible && (
          <AddPLUModal
            visible={addModalVisible}
            onClose={() => {
              setAddModalVisible(false);
            }}
            groupList={groupList}
            onSave={handleSavePLU}
          />
        )}

        {!loading && selectedPLU && (
          <DeletePLUModal
            visible={deleteModalVisible}
            onClose={() => {
              setDeleteModalVisible(false);
              setSelectedPLU(null);
            }}
            onDelete={handleDeletePLU}
            pluName={selectedPLU?.plu_desc}
            pluBarcode={selectedPLU?.plu_code}
          />
        )}
        {fetching ||
          (loading && (
            <ProgressModal
              ismodelVisible={fetching || loading}
              label={
                fetching
                  ? 'Getting PLU Products'
                  : deleteModalVisible
                    ? 'Deleting PLU'
                    : addModalVisible
                      ? 'Adding PLU'
                      : 'Please wait… retrieving PLU details.'
              }
            />
          ))}
      </View>
      {/* Add PLU Button */}
      <Pressable
        style={styles.addButton}
        onPress={async () => {
          setAddModalVisible(true);
          await dispatch(getPriceLevel()).unwrap();
          await dispatch(getStatusGroup()).unwrap();
        }}
      >
        <Image source={Icons.add} style={styles.addIcon} />
        <Text style={styles.addText}>Add PLU</Text>
      </Pressable>
    </View>
  );
}
