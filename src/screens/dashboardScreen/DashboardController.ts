import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getPLU,
  getPriceLevel,
  getStatusGroup,
  setLastSync,
} from '../../redux/actions/pluAction';
import { PLUItem } from '../../redux/dataTypes';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { Routes } from '../../constants';
import { apiURLs, deleteApi, get, post } from '../../services/api';
import { userForceLogout } from '../../redux/actions/authAction';
import {
  handleAppStateFlags,
  showNotificationMessage,
} from '../utils/helperFunction';
import { getActiveSubscription } from '../../redux/actions/SubscriptionAction';

const DashboardController = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPLU, setSelectedPLU] = useState<PLUItem | null>(null);
  const [groupList, setGroupList] = useState<any[]>([]);
  const { pluList, fetching, currentPage, loadingMore, lastSync } =
    useAppSelector(state => state?.plu || []);

  useFocusEffect(
    useCallback(() => {
      setSearch('');
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      activeSubscription();
    }, [])
  );

  const activeSubscription = async () => {
    await dispatch(getActiveSubscription()).unwrap();
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const searchText = typeof search === 'string' ? search.trim() : '';
      getpluAPI(1, false, searchText);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleLoadMore = () => {
    if (pluList.next && !loadingMore) {
      const searchText = typeof search === 'string' ? search.trim() : '';
      dispatch(
        getPLU({
          page: currentPage + 1,
          limit: 10,
          isLoadMore: true,
          search: searchText,
        }),
      );
    }
  };

  useEffect(() => {
    // getposDetails();
    // getpluAPI(1, false, '');
    getGroupListApi();
  }, []);

  const { userDetails }: any = useAppSelector(state => ({
    userDetails: state?.auth?.userLoginDetails ?? {},
  }));

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
      setLoading(true);
      setSearch('');
      const response = await get(`${apiURLs?.posDetails}`);
      console.log('response =>> ', response);
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

        // ✅ Store in Redux
        dispatch(setLastSync(formattedDate));

        // Fetch remaining data in parallel
        await Promise.all([
          getpluAPI(1, false, ''),
          dispatch(getPriceLevel()).unwrap(),
          dispatch(getStatusGroup()).unwrap(),
          getGroupListApi(),
        ]);
      }
    } catch (error: any) {
      console.log('error =>> ', error?.response);
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

  const getGroupListApi = async () => {
    // setIsLoading(true);
    try {
      const response = await get(`${apiURLs.groupList}`);
      if (response?.data?.status) {
        const apiData = response?.data?.data || [];
        const data = [{ value: 0, label: 'None' }, ...apiData];
        setGroupList(data);
        console.log('groupList =>> ', data);
      }
    } catch (error: any) {
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
      // setIsLoading(false);
    }
  };

  const handleSavePLU = async (plu: any) => {
    try {
      setLoading(true);
      const response = await post(apiURLs?.addPlu, plu);
      console.log('response =>> ', response);
      showNotificationMessage(response?.data?.message);
      if (response?.data?.status) {
        setAddModalVisible(false);
        setTimeout(async () => {
          getpluAPI(1, false, '');
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

  const handleDeletePLU = async () => {
    setLoading(true);
    try {
      const response = await deleteApi(
        `${apiURLs.deletePlu + selectedPLU?.plu_id}/`,
      );
      showNotificationMessage(response?.data?.message);
      if (response?.data?.status) {
        setDeleteModalVisible(false);
        setSelectedPLU(null);
        setTimeout(() => {
          const searchText = typeof search === 'string' ? search.trim() : '';
          getpluAPI(1, false, searchText);
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

  function openEditModal(item: PLUItem) {
    setSelectedPLU(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: Routes.editPLUScreen,
        params: {
          pluData: item,
        },
      }),
    );
    // setEditModalVisible(true);
  }

  function openDeleteModal(item: PLUItem) {
    setSelectedPLU(item);
    setDeleteModalVisible(true);
  }
  return {
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
  };
};

export default DashboardController;
