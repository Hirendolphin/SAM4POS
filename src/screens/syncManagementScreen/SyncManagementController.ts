import { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { showNotificationMessage } from '../utils/helperFunction';

export interface PendingPLUItem {
  id: string;
  name: string;
  pluNumber: string;
  price: string;
  changeType: 'Add' | 'Edit' | 'Update';
  selected: boolean;
}

const DUMMY_DATA: PendingPLUItem[] = Array.from({ length: 35 }).map((_, i) => ({
  id: `${i + 1}`,
  name: `PLU Item ${i + 1}`,
  pluNumber: `300${i + 1}`,
  changeType: i % 3 === 0 ? 'Add' : i % 3 === 1 ? 'Update' : i % 3 === 2 ? "Delete" : 'Edit',
  price: `$${(1.5 + i * 0.25).toFixed(2)}`,
  selected: false,
}));

const SyncManagementController = () => {
  const navigation = useNavigation();
  const [syncItems, setSyncItems] = useState<PendingPLUItem[]>(DUMMY_DATA);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const LIMIT = 10;

  // Filter items based on debounced search text to mimic API search latency
  const filteredItems = syncItems.filter(item =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    item.pluNumber.includes(debouncedSearch)
  );
  const paginatedItems = filteredItems.slice(0, currentPage * LIMIT);
  const hasMore = paginatedItems.length < filteredItems.length;

  // React to search text changes with a debounce to mimic `DashboardController`
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(typeof search === 'string' ? search.trim() : '');
      setCurrentPage(1); // Reset to first page upon new search
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoadingMore(false);
      }, 1000);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleToggleItem = useCallback((id: string) => {
    setSyncItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  const handleToggleSelectAll = useCallback((selectAll: boolean) => {
    setSyncItems(prevItems =>
      prevItems.map(item => ({ ...item, selected: selectAll }))
    );
  }, []);

  const isAllSelected = syncItems.length > 0 && syncItems.every(item => item.selected);
  const selectedCount = syncItems.filter(item => item.selected).length;

  const handleSyncSelected = async () => {
    const itemsToSync = syncItems.filter(item => item.selected);
    if (itemsToSync.length === 0) return;

    setLoading(true);
    setTimeout(() => {
      setSyncItems(prevItems => prevItems.filter(item => !item.selected));
      setLoading(false);
      showNotificationMessage(`Successfully synced ${itemsToSync.length} PLU items to POS.`);
    }, 1500);
  };

  return {
    paginatedItems,
    loading,
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
