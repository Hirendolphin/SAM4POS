import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { showNotificationMessage } from '../utils/helperFunction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPendingPLU } from '../../redux/actions/pluAction';
import { PLUItem } from '../../redux/dataTypes';

const SyncManagementController = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { pendingPluList, fetching, loadingMore } = useAppSelector(state => state.pendingPlu);

  const [localLoading, setLocalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const LIMIT = 10;

  // React to search text changes with a debounce to mimic `DashboardController`
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(typeof search === 'string' ? search.trim() : '');
      setCurrentPage(1); // Reset to first page upon new search
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    dispatch(
      getPendingPLU({
        page: currentPage,
        limit: LIMIT,
        search: debouncedSearch,
        isLoadMore: currentPage > 1,
      })
    );
  }, [currentPage, debouncedSearch, dispatch]);

  const hasMore = pendingPluList.next !== null;

  const handleLoadMore = () => {
    if (hasMore && !loadingMore && !fetching) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleToggleItem = useCallback((id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(selId => selId !== id) : [...prev, id]
    );
  }, []);

  const handleToggleSelectAll = useCallback(
    (selectAll: boolean) => {
      if (selectAll) {
        setSelectedIds(pendingPluList.results.map(item => item.id));
      } else {
        setSelectedIds([]);
      }
    },
    [pendingPluList.results]
  );

  const mappedPendingPluList = useMemo(
    () => ({
      ...pendingPluList,
      results: pendingPluList.results.map(item => ({
        ...item,
        selected: selectedIds.includes(item.id),
      })),
    }),
    [pendingPluList, selectedIds]
  );

  const isAllSelected =
    mappedPendingPluList.results.length > 0 &&
    mappedPendingPluList.results.every(item => item.selected);
  const selectedCount = selectedIds.length;

  const handleSyncSelected = async () => {
    const itemsToSync = selectedIds;
    if (itemsToSync.length === 0) return;

    console.log('itemsToSync =>> ', itemsToSync);

    // setLocalLoading(true);
    // setTimeout(() => {
    //   setLocalLoading(false);
    //   showNotificationMessage(`Successfully synced ${itemsToSync.length} PLU items to POS.`);
    //   setSelectedIds([]);
    //   setCurrentPage(1);
    //   dispatch(
    //     getPendingPLU({
    //       page: 1,
    //       limit: LIMIT,
    //       search: debouncedSearch,
    //       isLoadMore: false,
    //     })
    //   );
    // }, 1500);
  };

  return {
    pendingPluList: mappedPendingPluList,
    loading: fetching || localLoading,
    loadingMore,
    search,
    setSearch,
    goBack,
    handleToggleItem,
    handleToggleSelectAll,
    isAllSelected,
    selectedCount,
    handleSyncSelected,
    handleLoadMore,
  };
};

export default SyncManagementController;
