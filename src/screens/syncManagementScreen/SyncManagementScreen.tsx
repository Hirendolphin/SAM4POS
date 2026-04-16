import React from 'react';
import { View, Text, FlatList, Pressable, Image, ActivityIndicator } from 'react-native';
import styles from './SyncManagementStyle';
import SyncManagementController, { PendingPLUItem } from './SyncManagementController';
import { Checkbox } from '../../components/Checkbox';
import { Icons } from '../../assets/icons';
import ProgressModal from '../../components/ProgressModal';
import HeaderComponent from '../../components/HeaderComponent';
import InputTextComponent from '../../components/InputTextComponent';
import { PrimaryButton } from '../../components/PrimaryButton';
import SyncManagementCard from './syncManagementCard/SyncManagementCard';

export default function SyncManagementScreen() {
  const {
    pendingPluList,
    loading,
    loadingMore,
    goBack,
    handleToggleItem,
    handleToggleSelectAll,
    isAllSelected,
    selectedCount,
    handleSyncSelected,
    handleLoadMore,
    search,
    setSearch,
    loadingMessage,
  } = SyncManagementController();

  console.log('pendingPluList =>> ', pendingPluList);

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Sync Management"
        onPressBack={goBack}
      />

      <View style={styles.content}>
        <InputTextComponent
          placeholdertext="Search PLU"
          inputProps={{
            value: search,
            onChangeText: (text: string) => {
              setSearch(text || '');
            },
          }}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Pending PLU Changes</Text>
          <View style={{ flex: 1 }} />
          <Checkbox
            label={`Select All`}
            checked={isAllSelected}
            onChange={handleToggleSelectAll}
          />
        </View>

        <FlatList
          data={pendingPluList.results}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SyncManagementCard
              item={item}
              handleToggleItem={handleToggleItem}
            />
          )}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" style={{ marginVertical: 20 }} /> : null}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image source={Icons.refresh} style={styles.emptyIcon} resizeMode="contain" />
              <Text style={styles.emptyText}>No pending changes to sync.</Text>
            </View>
          }

        />
      </View>

      {pendingPluList.results.length > 0 && (
        <View style={styles.bottomActionBar}>
          <PrimaryButton
            title={`Sync Selected (${selectedCount})`}
            onPress={selectedCount > 0 ? handleSyncSelected : () => { }}
            style={selectedCount === 0 ? styles.syncButtonDisabled : { flex: 1 }}
          />
        </View>
      )}

      {loading && <ProgressModal ismodelVisible={loading} label={loadingMessage || "Please wait..."} />}
    </View>
  );
}
