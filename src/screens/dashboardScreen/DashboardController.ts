import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPLU } from '../../redux/actions/pluAction';
import { PLUItem } from '../../redux/dataTypes';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants';
import { apiURLs, deleteApi, get, post } from '../../services/api';
import { userForceLogout } from '../../redux/actions/authAction';
import { showNotificationMessage } from '../utils/helperFunction';
import axios from 'axios';

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

const DashboardController = () => {
  const navigation = useNavigation();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPLU, setSelectedPLU] = useState<PLUItem | null>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { pluList, fetching, currentPage, loadingMore } = useAppSelector(
    state => state?.plu || [],
  );
  const [search, setSearch] = useState<string>('');

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
    getposDetails();
    // getpluAPI(1, false, '');
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
      const response = await get(`${apiURLs?.posDetails}`);
      if (response?.status) {
        setTimeout(() => {
          getpluAPI(1, false, '');
        }, 500);
      }
    } catch (error: any) {
      console.log('error ===>> ', error?.response);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          dispatch(userForceLogout({ forcelogout: true }));
        } else if (typeof error.response?.data?.error === 'string') {
          showNotificationMessage(error.response.data.error);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSavePLU = async (plu: any) => {
    try {
      setLoading(true);
      const response = await post(apiURLs?.addPlu, plu);
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
        } else if (typeof error.response?.data?.error === 'string') {
          showNotificationMessage(error.response.data.error);
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
      console.log('delete plu ====>>', response?.data);
      showNotificationMessage(response?.data?.message);
      if (response?.data?.status) {
        setDeleteModalVisible(false);
        setSelectedPLU(null);
        setTimeout(() => {
          getpluAPI(1, false, '');
        }, 500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          dispatch(userForceLogout({ forcelogout: true }));
        } else if (typeof error.response?.data?.error === 'string') {
          showNotificationMessage(error.response.data.error);
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
    SAMPLE_PLUS,
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
  };
};

export default DashboardController;
