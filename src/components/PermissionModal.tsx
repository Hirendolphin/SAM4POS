import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { moderateScale } from '../theme/Metrics';
import { colors } from '../theme/colors';
import { FontFamily } from '../assets/fonts';

export default function PermissionModal({
  visible,
  onRequestAgain,
  onOpenSettings,
}: {
  visible: boolean;
  onRequestAgain: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.label}>Camera Permission Required</Text>
          <Text style={styles.labelContent}>
            We need access to your camera to scan barcodes. Please allow camera
            permission in order to continue.
          </Text>

          <View style={styles.buttonRow}>
            <PrimaryButton
              title="CANCEL"
              onPress={onRequestAgain}
              style={styles.enterManuallyButton}
              labelStyle={styles.enterManuallyLabel}
            />
            <PrimaryButton
              title={'OPEN SETTINGS'}
              onPress={onOpenSettings}
              style={styles.scanAgainButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(18),
  },
  buttonRow: {
    flexDirection: 'row',
  },
  enterManuallyButton: {
    flex: 1,
    marginTop: moderateScale(15),
    marginRight: moderateScale(5),
    backgroundColor: colors.backgorund3,
  },
  enterManuallyLabel: {
    color: colors.primary,
  },
  scanAgainButton: {
    flex: 1,
    marginTop: moderateScale(15),
    marginLeft: moderateScale(5),
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: colors.black,
    includeFontPadding: false,
    textAlign: 'center',
  },
  labelContent: {
    fontFamily: FontFamily.semiBold,
    fontSize: moderateScale(12),
    fontWeight: '600',
    includeFontPadding: false,
    color: colors.black,
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(5),
    textAlign: 'center',
  },
});
