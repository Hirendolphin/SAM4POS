import { useState, useEffect } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAppDispatch } from '../../redux/hooks';
import { Routes } from '../../constants';
import {
  getPriceLevel,
  getStatusGroup,
  getPLU,
  setLastSync,
} from '../../redux/actions/pluAction';
import { getPosDetails } from '../../redux/actions/pluAction';
import { getGroupList } from '../../redux/actions/pluAction';
import usePosDetailsFlow from '../../services/posFlow';
import { get, post, apiURLs } from '../../services/api';
import {
  showNotificationMessage,
  handleAppStateFlags,
} from '../utils/helperFunction';
import { handleApiError } from '../utils/helperFunction';
import { userForceLogout } from '../../redux/actions/authAction';
import axios from 'axios';

const HomeScreenController = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [groupList, setGroupList] = useState<any[]>([]);
  const { trigger, Modal } = usePosDetailsFlow();

  // helper APIs
  const getStatusGroupApi = async () => {
    await dispatch(getStatusGroup()).unwrap();
  };

  const getPriceLevelListApi = async () => {
    await dispatch(getPriceLevel()).unwrap();
  };

  useEffect(() => {
    // trigger the unified flow before getting pos details
    trigger(getposDetails);
  }, []);

  // on screen visible, ensure mandatory helper APIs are fetched
  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          getStatusGroupApi(),
          getPriceLevelListApi(),
          getGroupListApi(),
        ]);
      } catch (e) {
        /* errors handled in helper via handleApiError */
      }
    })();
  }, []);

  const getpluAPI = async (
    page: number = 1,
    isLoadMore: boolean = false,
    searchText: string = '',
  ) => {
    await dispatch(
      getPLU({
        page,
        limit: 10,
        isLoadMore,
        search: searchText,
      }),
    );
  };

  const getposDetails = async () => {
    try {
      setLoadingMessage('Please wait… retrieving PLU details.');
      setLoading(true);
      await dispatch(getPosDetails()).unwrap();
    } catch (error: any) {
      dispatch(setLastSync('Not Synced'));
      handleApiError(error, dispatch as any);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const getGroupListApi = async () => {
    try {
      const res: any = await dispatch(getGroupList()).unwrap();
      if (res?.status) {
        const apiData = res?.data || [];
        const data = [{ value: 0, label: 'None' }, ...apiData];
        setGroupList(data);
      }
    } catch (error: any) {
      handleApiError(error, dispatch as any);
    }
  };

  const handleSavePLU = async (plu: any) => {
    try {
      setLoadingMessage('Adding PLU...');
      // setLoading(true);
      const response = (await post(apiURLs?.addPlu, plu)) as any;
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
      console.log('adding plue error', error.response);
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
      setLoadingMessage('');
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

  const navigateToSyncManagement = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: Routes.syncManagement,
      }),
    );
  };

  return {
    Modal,
    addModalVisible,
    setAddModalVisible,
    loading,
    loadingMessage,
    groupList,
    handleSavePLU,
    openAddModal,
    navigateToDashboard,
    navigateToSyncManagement,
  };
};

export default HomeScreenController;
