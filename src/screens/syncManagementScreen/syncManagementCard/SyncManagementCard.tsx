import React, { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../SyncManagementStyle';
import { PLUItem } from '../../../redux/dataTypes';
import { Checkbox } from '../../../components/Checkbox';

interface SyncManagementCardProps {
  item: PLUItem;
  handleToggleItem: (id: number) => void;
}

function SyncManagementRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowKey}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const SyncManagementCard: React.FC<SyncManagementCardProps> = ({ item, handleToggleItem }) => {
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'Create':
        return styles.badgeAdd;
      case 'Update':
        return styles.badgeUpdate;
      case 'Delete':
        return styles.badgeDelete;
      default:
        return styles.badgeUpdate;
    }
  };

  return (
    <Pressable style={styles.card} onPress={() => handleToggleItem(item.id)}>
      <View style={styles.headerRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Checkbox
            checked={item?.selected || false}
            onChange={() => handleToggleItem(item.id)}
          />
          <Text style={[styles.pluLine, { marginLeft: 10 }]}>
            <Text style={styles.pluKey}>PLU Code : </Text>
            <Text style={styles.pluKey}>{item.plu_code}</Text>
          </Text>
        </View>
        <View style={styles.actions}>
          <View style={[styles.badgeContainer, getBadgeStyle(item?.operation_display || '')]}>
            <Text style={styles.badgeText}>{item?.operation_display}</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <SyncManagementRow label="Description (PLU Name) :" value={item?.payload?.plu_desc} />
      <SyncManagementRow label="Stock :" value={item?.payload?.stock_qty?.toString() || '0'} />
    </Pressable>
  );
};

export default memo(SyncManagementCard);
