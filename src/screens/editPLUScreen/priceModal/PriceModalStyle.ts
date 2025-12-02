import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme/Metrics';
import { colors } from '../../../theme/colors';

export default StyleSheet.create({
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

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },

  modalTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: colors.white,
    backgroundColor: colors.textGray2,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(4),
    includeFontPadding: false,
  },

  closeIcon: {
    fontSize: moderateScale(20),
    color: colors.black,
    padding: 4,
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
});
