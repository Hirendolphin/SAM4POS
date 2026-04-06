import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, Platform } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Routes } from '../../constants';
import styles from './HomeScreenStyle';
import { Icons } from '../../assets/icons';
import { AddPLUModal } from '../dashboardScreen/addPLUModal/AddPLUModal';
import { useAppDispatch } from '../../redux/hooks';
import { getPriceLevel, getStatusGroup } from '../../redux/actions/pluAction';
import { get, post, apiURLs } from '../../services/api';
import { showNotificationMessage, handleAppStateFlags } from '../utils/helperFunction';
import { userForceLogout } from '../../redux/actions/authAction';
import ProgressModal from '../../components/ProgressModal';
import axios from 'axios';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groupList, setGroupList] = useState<any[]>([]);

  useEffect(() => {
    // Pre-fetch group list as it's required for Add PLU
    getGroupListApi();
  }, []);

  const getGroupListApi = async () => {
    try {
      const response = await get(`${apiURLs.groupList}`) as any;
      if (response?.data?.status) {
        const apiData = response?.data?.data || [];
        const data = [{ value: 0, label: 'None' }, ...apiData];
        setGroupList(data);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          dispatch(userForceLogout({ forcelogout: true }));
        }
      }
    }
  };

  const handleSavePLU = async (plu: any) => {
    try {
      setLoading(true);
      const response = await post(apiURLs?.addPlu, plu) as any;
      showNotificationMessage(response?.data?.message);
      if (response?.data?.status) {
        setAddModalVisible(false);
        // Automatically navigate to the PLU List so they can see the newly added item
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: Routes.dashboard,
            }),
          );
        }, 500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          dispatch(userForceLogout({ forcelogout: true }));
        } else if (error.response?.data?.status === false) {
          const eData = error?.response?.data;
          const handled = handleAppStateFlags(eData, dispatch);
          if (!handled && typeof error.response?.data?.error === 'string') {
            showNotificationMessage(error.response.data.error);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = async () => {
    setAddModalVisible(true);
    await dispatch(getPriceLevel()).unwrap();
    await dispatch(getStatusGroup()).unwrap();
  };

  const navigateToDashboard = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: Routes.dashboard,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>

      <Pressable style={styles.card} onPress={navigateToDashboard}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Search / Edit PLU</Text>
          <Text style={styles.cardSubtitle}>Find and modify existing products</Text>
        </View>
        <Image source={Icons.rightArrow} style={styles.iconImage} resizeMode='contain' />
      </Pressable>

      <Pressable style={styles.card} onPress={openAddModal}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Add PLU</Text>
          <Text style={styles.cardSubtitle}>Quickly create a new product</Text>
        </View>
        <Image source={Icons.add} style={styles.iconImage} />
      </Pressable>

      {!loading && addModalVisible && (
        <AddPLUModal
          visible={addModalVisible}
          onClose={() => setAddModalVisible(false)}
          groupList={groupList}
          onSave={handleSavePLU}
        />
      )}

      {loading && <ProgressModal ismodelVisible={loading} label="Adding PLU" />}
    </View>
  );
}
