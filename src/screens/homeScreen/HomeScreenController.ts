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
import { get, post, apiURLs } from '../../services/api';
import {
  showNotificationMessage,
  handleAppStateFlags,
} from '../utils/helperFunction';
import { userForceLogout } from '../../redux/actions/authAction';
import axios from 'axios';

const HomeScreenController = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [groupList, setGroupList] = useState<any[]>([]);

  useEffect(() => {
    // getposDetails();
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
      const response = (await get(`${apiURLs?.posDetails}`)) as any;

      if (response?.status) {
        const now = new Date();

        const day = now.getDate().toString().padStart(2, '0');
        const month = now.toLocaleString('en-US', { month: 'short' });
        const year = now.getFullYear();

        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12; // convert to 12-hour format

        const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;

        dispatch(setLastSync(formattedDate));

        await Promise.all([
          getpluAPI(1, false, ''),
          dispatch(getPriceLevel()).unwrap(),
          dispatch(getStatusGroup()).unwrap(),
          getGroupListApi(),
        ]);
      }
    } catch (error: any) {
      dispatch(setLastSync('Not Synced'));
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

  const getGroupListApi = async () => {
    try {
      const response = (await get(`${apiURLs.groupList}`)) as any;
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
      setLoadingMessage('Adding PLU...');
      setLoading(true);
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
