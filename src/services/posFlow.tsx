import React, { useState, useCallback, useRef } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Routes } from '../constants';
import { useAppDispatch } from '../redux/hooks';
import PendingChangesModal from '../components/PendingChangesModal';
import { getPendingPLU, syncPLU } from '../redux/actions/pluAction';
import { clearPendingPlu as clearPendingPluAction } from '../redux/actions/pluAction';
import { handleApiError } from '../screens/utils/helperFunction';

type Options = {
  onGetPosDetails: () => Promise<void> | void;
};

export const usePosDetailsFlow = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const callbackRef = useRef<(() => Promise<void> | void) | undefined>(
    undefined,
  );

  const trigger = useCallback(
    async (onGetPosDetails?: () => Promise<void> | void) => {
      try {
        setLoading(true);
        // fetch pending; only need the first page to check existence
        const resAction: any = await dispatch(
          getPendingPLU({ page: 1, limit: 1, isLoadMore: false }),
        );

        const payload = resAction?.payload ?? {};
        const results = payload?.results?.results || [];

        if (!results || results.length === 0) {
          // nothing pending — proceed
          setLoading(false);
          return onGetPosDetails ? await onGetPosDetails() : undefined;
        }

        // there are pending changes — show modal and wait for user action
        setLoading(false);
        callbackRef.current = onGetPosDetails;
        setModalVisible(true);
      } catch (e) {
        setLoading(false);
        handleApiError(e, dispatch as any);
      }
    },
    [dispatch],
  );

  const onSyncNow = useCallback(
    async (onGetPosDetails?: () => Promise<void> | void) => {
      try {
        setLoading(true);
        // trigger full sync; backend supports select_all flag
        await dispatch(syncPLU({ select_all: true }));
        setModalVisible(false);
        setLoading(false);
        const cb = callbackRef.current || onGetPosDetails;
        if (cb) await cb();
      } catch (e) {
        setLoading(false);
        handleApiError(e, dispatch as any);
      }
    },
    [dispatch],
  );

  const onDiscard = useCallback(
    async (onGetPosDetails?: () => Promise<void> | void) => {
      // Clear local pending list (UI state) and proceed — no server endpoint to discard
      try {
        setLoading(true);
        await dispatch(clearPendingPluAction());
        setModalVisible(false);
        setLoading(false);
        const cb = callbackRef.current || onGetPosDetails;
        if (cb) await cb();
      } catch (e) {
        setLoading(false);
        handleApiError(e, dispatch as any);
      }
    },
    [dispatch],
  );

  const onReview = useCallback(() => {
    setModalVisible(false);
    navigation.dispatch(
      CommonActions.navigate({
        name: Routes.syncManagement,
      } as any),
    );
  }, [navigation]);

  const Modal = (
    <PendingChangesModal
      visible={modalVisible}
      loading={loading}
      onSyncNow={() => onSyncNow()}
      onDiscard={() => onDiscard()}
      onReview={onReview}
    />
  );

  return {
    trigger,
    Modal,
    modalVisible,
    setModalVisible,
  };
};

export default usePosDetailsFlow;
