import React, { FC } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import styles from './GroupModalStyle';

export interface GroupItem {
  value: string | number;
  label: string;
}

interface GroupModalProps {
  visible: boolean;
  onClose: () => void;
  groupList: GroupItem[];
  selectedGroup: string | number | null;
  onSelect: (value: string | number) => void;
  title?: string;
}

const GroupModal: FC<GroupModalProps> = ({
  visible,
  onClose,
  groupList,
  selectedGroup,
  onSelect,
  title = 'GROUP LINK',
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <FlatList
            data={groupList}
            keyExtractor={item => item.value.toString()}
            renderItem={({ item }) => {
              const isSelected = item.value === selectedGroup;

              return (
                <TouchableOpacity
                  style={[styles.row, isSelected && styles.selectedRow]}
                  onPress={() => onSelect(item.value)}
                >
                  <Text
                    style={[styles.label, isSelected && styles.selectedLabel]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GroupModal;
