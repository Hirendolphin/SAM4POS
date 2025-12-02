import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { userForceLogout } from '../../redux/actions/authAction';
import {
  getPLU,
  getPriceLevel,
  getStatusGroup,
} from '../../redux/actions/pluAction';
import { PLUItem } from '../../redux/dataTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { apiURLs, get, post } from '../../services/api';
import { showNotificationMessage } from '../utils/helperFunction';

const EditPLUController = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { pluData } = route?.params;
  const { statusGroup, priceLevels }: any = useAppSelector(state => ({
    statusGroup: state?.plu?.statusGroup ?? [],
    priceLevels: state?.plu?.priceLevel ?? [],
  }));

  const [prices, setPrices] = useState(pluData?.prices);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const [pluProductData, setPLUProductData] = useState<PLUItem>(pluData);
  const dispatch = useAppDispatch();

  const [stockModalVisible, setStockModalVisible] = useState(false);

  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [price, setPrice] = useState('0.00');
  const [level, setLevel] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null); // current row in edit

  const [statusGroupModal, setStatusGroupModal] = useState(false);
  const [statusGroupList, setStatusGroupList] = useState(statusGroup);
  const [selectedStatusGroup, setSelectedStatusGroup] = useState('');

  const [groupModal, setGroupModal] = useState(false);
  const [groupTitle, setGroupTitle] = useState('');
  const [groupList, setGroupList] = useState([]);

  const [activeLinkKey, setActiveLinkKey] = useState(null);

  const [groupLinks, setGroupLinks] = useState({
    link1: pluProductData?.id_group1,
    link2: pluProductData?.id_group2,
    link3: pluProductData?.id_group3,
  });

  const [desc, setDesc] = useState(pluProductData?.plu_desc);
  const [kpDesc, setKpDesc] = useState(pluProductData?.str_kp_desc);
  const [stockQty, setStockQty] = useState<string | number>(
    pluProductData?.stock_qty,
  );
  const [stock, setStock] = useState<number | string>(
    pluProductData?.stock_qty ?? 0,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (statusGroup?.length > 0) {
      setStatusGroupList(statusGroup);
      setSelectedStatusGroup(statusGroup[0]?.value || '');
    }
  }, [statusGroup]);

  useEffect(() => {
    getGroupListApi();
    getStatusGroupApi();
    getPriceLevelListApi();
  }, []);

  useEffect(() => {
    setStock(stockQty);
  }, [stockQty]);

  const getStatusGroupApi = async () => {
    await dispatch(getStatusGroup()).unwrap();
  };
  const getPriceLevelListApi = async () => {
    await dispatch(getPriceLevel()).unwrap();
  };

  const getGroupListApi = async () => {
    setIsLoading(true);
    try {
      const response = await get(`${apiURLs.groupList}`);
      if (response?.data?.status) {
        const apiData = response?.data?.data || [];
        const data = [{ value: 0, label: 'None' }, ...apiData];
        setGroupList(data);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          dispatch(userForceLogout({ forcelogout: true }));
        } else if (typeof error.response?.data?.error === 'string') {
          showNotificationMessage(error.response.data.error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getGroupNameById = id => {
    const found = groupList.find(g => g.value === id);
    return found ? found.label : 'None';
  };
  const getGroupStatusNameById = id => {
    const found = statusGroupList.find(g => g.value === id);
    return found ? found.label : 'None';
  };

  // const priceLevels = [
  //   { label: 'PRICE LEVEL 1', value: 'L1' },
  //   { label: 'PRICE LEVEL 2', value: 'L2' },
  //   { label: 'PRICE LEVEL 3', value: 'L3' },
  // ];

  // levels currently used
  const usedLevels = prices.map(p => p.id_price_level);

  // for ADD – only show unused levels
  const levelListForAdd = priceLevels.filter(
    l => !usedLevels.includes(l.value),
  );

  // for EDIT – show unused + current item's level
  const levelListForEdit = editingItem
    ? priceLevels.filter(
        l =>
          l.value === editingItem.id_price_level ||
          !usedLevels.includes(l.value),
      )
    : priceLevels;

  const addPrice = () => {
    setIsEdit(false);
    setEditingItem(null);
    setPrice('0.00');
    setLevel('');
    setPriceModalVisible(true);
  };

  const editPrice = (item: any) => {
    setIsEdit(true);
    setEditingItem(item);
    setPrice(item.long_plu_price.toString());
    setLevel(item.id_price_level);
    setPriceModalVisible(true);
  };

  const deletePrice = (item: any) => {
    setPrices(prev => {
      if (prev.length <= 1) {
        showNotificationMessage('At least one price is required.');
        return prev;
      }

      return prev.filter(p => p.id !== item.id);
    });
  };

  /* --------------------------- SAVE --------------------------- */

  const buildPluPricesArray = () => {
    return prices.map(p => ({
      price: Number(p.long_plu_price),
      price_level: Number(p.id_price_level),
    }));
  };
  const handleSubmitPrice = () => {
    if (!level) {
      showNotificationMessage('Please select a price level.');
      return;
    }

    if (!price || isNaN(Number(price))) {
      showNotificationMessage('Please enter a valid price.');
      return;
    }

    if (!isEdit) {
      setPrices(prev => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          id_price_level: level,
          long_plu_price: price,
        },
      ]);
    } else if (editingItem) {
      // EDIT mode
      setPrices(prev =>
        prev.map(p =>
          p.id === editingItem.id
            ? { ...p, id_price_level: level, long_plu_price: price }
            : p,
        ),
      );
    }

    setPriceModalVisible(false);
  };

  const getpluAPI = async () => {
    await dispatch(getPLU({ page: 1, limit: 10, search: '' }));
  };

  const getLevelLabel = value => {
    const found = priceLevels.find(pl => pl.value === value);
    return found ? found.label : value;
  };

  const handleSave = async () => {
    setIsLoading(true);
    // 1. Make sure at least one price exists
    if (!prices || prices.length === 0) {
      showNotificationMessage('Please add at least one price.');
      return;
    }
    const plu_prices = buildPluPricesArray();

    const payload = {
      plu_id: pluProductData?.plu_id,
      plu_price: JSON.stringify(plu_prices),
      plu_desc: desc,
      str_kp_desc: kpDesc,
      stock_qty: Number(stock) || 0,
      id_plu_status_group: selectedStatusGroup,
      id_group1: groupLinks.link1 || 0,
      id_group2: groupLinks.link2 || 0,
      id_group3: groupLinks.link3 || 0,
    };

    console.log('UPDATE PLU PAYLOAD ==>', payload);
    try {
      const response = await post(apiURLs.updatePlu, payload);
      console.log('edit data response ==>> ', response?.data);
      showNotificationMessage(response?.data?.message);
      if (response?.data?.status) {
        navigation.dispatch(CommonActions.goBack());
        setTimeout(async () => {
          await getpluAPI();
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
      setIsLoading(false);
    }
  };

  return {
    desc,
    setDesc,
    kpDesc,
    setKpDesc,
    pluProductData,
    addPrice,
    prices,
    getLevelLabel,
    editPrice,
    deletePrice,
    stockQty,
    setStockModalVisible,
    getGroupNameById,
    groupLinks,
    setGroupModal,
    setGroupTitle,
    setActiveLinkKey,
    getGroupStatusNameById,
    selectedStatusGroup,
    setStatusGroupModal,
    handleSave,
    isLoading,
    level,
    isEdit,
    levelListForEdit,
    levelListForAdd,
    handleSubmitPrice,
    price,
    setLevel,
    setPrice,
    priceModalVisible,
    stockModalVisible,
    stock,
    setStock,
    setStockQty,
    groupModal,
    statusGroupModal,
    groupTitle,
    groupList,
    statusGroupList,
    activeLinkKey,
    setSelectedStatusGroup,
    setGroupLinks,
    setPriceModalVisible,
    navigation,
  };
};

export default EditPLUController;
