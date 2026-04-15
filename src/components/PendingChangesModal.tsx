import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { colors } from '../theme/colors';
import { moderateScale, horizontalScale } from '../theme/Metrics';
import { FontFamily } from '../assets/fonts';

type Props = {
  visible: boolean;
  loading?: boolean;
  onSyncNow: () => void;
  onDiscard: () => void;
  onReview: () => void;
};

const PendingChangesModal: React.FC<Props> = ({
  visible,
  loading = false,
  onSyncNow,
  onDiscard,
  onReview,
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>You have pending changes</Text>
          <Text style={styles.description}>What would you like to do?</Text>

          <View style={styles.buttonRow}>
            <PrimaryButton
              title={loading ? 'Syncing...' : 'Sync Now'}
              onPress={() => {
                if (!loading) onSyncNow();
              }}
              style={[styles.button, styles.primary]}
              labelStyle={styles.primaryText}
            />

            <PrimaryButton
              title={'Review Changes'}
              onPress={() => {
                if (!loading) onReview();
              }}
              style={[styles.button, styles.secondary]}
              labelStyle={styles.secondaryText}
            />

            <PrimaryButton
              title={'Discard Changes'}
              onPress={() => {
                if (!loading) onDiscard();
              }}
              style={[styles.button, styles.danger]}
              labelStyle={styles.dangerText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20),
  },
  container: {
    width: '100%',
    maxWidth: horizontalScale(340),
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    color: colors.label,
    fontFamily: FontFamily.semiBold,
    marginBottom: moderateScale(8),
  },
  description: {
    fontSize: moderateScale(14),
    color: colors.textGray,
    fontFamily: FontFamily.regular,
    marginBottom: moderateScale(16),
    textAlign: 'center',
  },
  buttonRow: {
    width: '100%',
  },
  button: {
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(10),
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.backgorund3,
    borderWidth: 1,
    borderColor: colors.devider,
  },
  danger: {
    backgroundColor: colors.lightred2,
  },
  primaryText: {
    color: colors.white,
    fontFamily: FontFamily.semiBold,
    fontSize: moderateScale(15),
  },
  secondaryText: {
    color: colors.primary,
    fontFamily: FontFamily.semiBold,
    fontSize: moderateScale(15),
  },
  dangerText: {
    color: colors.red2,
    fontFamily: FontFamily.semiBold,
    fontSize: moderateScale(15),
  },
});

export default PendingChangesModal;
