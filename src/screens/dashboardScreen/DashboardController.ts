import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getPLU,
  getPriceLevel,
  getStatusGroup,
  setLastSync,
} from '../../redux/actions/pluAction';
import { getPosDetails } from '../../redux/actions/pluAction';
import { getGroupList } from '../../redux/actions/pluAction';
import { PLUItem } from '../../redux/dataTypes';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import usePosDetailsFlow from '../../services/posFlow';
import { Routes } from '../../constants';
import { apiURLs, deleteApi, get, post } from '../../services/api';
import { userForceLogout } from '../../redux/actions/authAction';
import {
  handleAppStateFlags,
  showNotificationMessage,
  handleApiError,
} from '../utils/helperFunction';
import { getActiveSubscription } from '../../redux/actions/SubscriptionAction';
import { Platform } from 'react-native';

const DashboardController = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { trigger, Modal } = usePosDetailsFlow();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPLU, setSelectedPLU] = useState<PLUItem | null>(null);
  const groupList: any[] = useAppSelector(state => state?.plu?.groupList ?? []);
  const { pluList, fetching, currentPage, loadingMore, lastSync } =
    useAppSelector(state => state?.plu || []);

  useFocusEffect(
    useCallback(() => {
      setSearch('');
    }, []),
  );

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

  useFocusEffect(
    useCallback(() => {
      activeSubscription();
    }, []),
  );

  const activeSubscription = async () => {
    await dispatch(getActiveSubscription()).unwrap();
  };

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

  const getStatusGroupApi = async () => {
    await dispatch(getStatusGroup()).unwrap();
  };

  const getPriceLevelListApi = async () => {
    await dispatch(getPriceLevel()).unwrap();
  };

  const getGroupListApi = async () => {
    try {
      await dispatch(getGroupList()).unwrap();
    } catch (error: any) {
      handleApiError(error, dispatch as any);
    }
  };

  // useEffect(() => {
  //   // trigger the unified pending-check flow before getting pos details
  //   (async () => {
  //     try {
  //       trigger(getposDetails);
  //       // on visible, fetch mandatory helper APIs
  //       await Promise.all([
  //         getStatusGroupApi(),
  //         getPriceLevelListApi(),
  //         getGroupListApi(),
  //       ]);
  //     } catch (e) {
  //       /* handled by handleApiError */
  //     }
  //   })();
  // }, []);

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
      await dispatch(getPosDetails()).unwrap();
    } catch (error: any) {
      dispatch(setLastSync('Not Synced'));
      handleApiError(error, dispatch as any);
    } finally {
      setLoading(false);
    }
  };
  // single getGroupListApi is defined above

  const handleSavePLU = async (plu: any) => {
    try {
      if (Platform.OS == 'android') {
        setLoading(true);
      }
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
      handleApiError(error, dispatch as any);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePLU = async () => {
    if (Platform.OS == 'android') {
      setLoading(true);
    }
    try {
      console.log('delete selected plu ', selectedPLU);

      const response = await deleteApi(
        `${apiURLs.deletePlu + selectedPLU?.id}/`,
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
      handleApiError(error, dispatch as any);
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
    trigger,
    Modal,
    groupList,
  };
};

export default DashboardController;
