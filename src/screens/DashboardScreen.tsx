import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { AddPLUModal } from '../components/AddPLUModal';
import { EditPLUModal } from '../components/EditPLUModal';
import { DeletePLUModal } from '../components/DeletePLUModal';

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
    // Wire up later
  }

  function handleEditPLU(plu: any) {
    console.log('Edit PLU:', plu);
    setEditModalVisible(false);
    // Wire up later
  }

  function handleDeletePLU() {
    console.log('Delete PLU:', selectedPLU);
    setDeleteModalVisible(false);
    setSelectedPLU(null);
    // Wire up later
  }

  function openEditModal(item: PLU) {
    setSelectedPLU(item);
    setEditModalVisible(true);
  }

  function openDeleteModal(item: PLU) {
    setSelectedPLU(item);
    setDeleteModalVisible(true);
  }

  const renderItem = ({ item }: { item: PLU }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.pluLine}>
          <Text style={styles.pluKey}>PLU Code : </Text>
          <Text style={styles.pluCode}>{item.code}</Text>
        </Text>
        <View style={styles.actions}>
          <Pressable onPress={() => openEditModal(item)} style={styles.editBtn}>
            <Text style={styles.editText}>✏️</Text>
          </Pressable>
          <Pressable onPress={() => openDeleteModal(item)} style={styles.deleteBtn}>
            <Text style={styles.deleteText}>🗑️</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.separator} />
      <Row label="Description (PLU Name) :" value={item.name} />
      <Row label="Group :" value={item.group} />
      <Row label="Price :" value={item.price} />
      <Row label="Stock :" value={String(item.stock)} />
      <View style={{ height: 6 }} />
      <Text style={styles.kpKey}>KP Description :</Text>
      <Text style={styles.kpDesc}>{item.kpDescription}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={SAMPLE_PLUS}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <Text style={styles.brand}>SAM4POS</Text>
            <View style={styles.planCard}>
              <Text style={styles.planTitle}>Standard Plan</Text>
              <Text style={styles.planActive}>Standard Plan – Active until 22 Oct 2025</Text>
              <Pressable style={styles.manageBtn}><Text style={styles.manageBtnText}>Manage Subscription</Text></Pressable>
            </View>
            <View style={styles.syncRow}>
              <Text style={styles.syncText}>Last Sync: 22 Sep 2025, 4:32 PM</Text>
            </View>
            <Text style={styles.sectionTitle}>PLU Products</Text>
          </>
        }
      />

      <Pressable style={styles.fab} onPress={() => setAddModalVisible(true)}>
        <Text style={styles.fabPlus}>＋</Text>
        <Text style={styles.fabLabel}>Add PLU</Text>
      </Pressable>

      <AddPLUModal 
        visible={addModalVisible} 
        onClose={() => setAddModalVisible(false)} 
        onSave={handleSavePLU} 
      />

      {selectedPLU && (
        <>
          <EditPLUModal
            visible={editModalVisible}
            onClose={() => {
              setEditModalVisible(false);
              setSelectedPLU(null);
            }}
            onSave={handleEditPLU}
            initialData={{
              code: selectedPLU.code,
              name: selectedPLU.name,
              kpDescription: selectedPLU.kpDescription,
              group: selectedPLU.group,
              price: selectedPLU.price,
              stock: String(selectedPLU.stock),
            }}
          />

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
        </>
      )}
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}> 
      <Text style={styles.rowKey}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  brand: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 12,
  },
  planCard: {
    backgroundColor: '#FFF6DB',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  planTitle: {
    color: '#A57300',
    fontWeight: '700',
    marginBottom: 8,
  },
  planActive: {
    color: colors.text,
    marginBottom: 10,
  },
  manageBtn: {
    backgroundColor: colors.primary,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageBtnText: { color: '#fff', fontWeight: '600' },
  syncRow: {
    backgroundColor: '#F5F7FF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  syncText: { color: colors.text },
  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pluLine: {
    color: colors.text,
    flex: 1,
  },
  pluKey: { fontWeight: '700' },
  pluCode: { color: colors.primary, fontWeight: '600' },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    fontSize: 18,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: 18,
  },
  separator: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  rowKey: { color: colors.text },
  rowValue: { color: colors.text },
  kpKey: { color: colors.text, fontWeight: '600' },
  kpDesc: { color: colors.text },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: colors.primary,
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  fabPlus: { color: '#fff', fontSize: 20, marginRight: 6 },
  fabLabel: { color: '#fff', fontWeight: '700' },
});


