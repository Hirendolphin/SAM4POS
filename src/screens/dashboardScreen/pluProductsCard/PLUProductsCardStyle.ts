import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../assets/fonts';
import { colors } from '../../../theme/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme/Metrics';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    paddingVertical: verticalScale(9),
    paddingHorizontal: horizontalScale(12),
    marginVertical: moderateScale(5),
    marginHorizontal: moderateScale(5),
    borderRadius: moderateScale(10),
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(10),
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pluLine: {
    color: colors.text,
    flex: 1,
    includeFontPadding: false,
  },
  pluKey: {
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    fontSize: moderateScale(14),
    color: colors.primary,
    includeFontPadding: false,
  },
  actions: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  editBtn: {
    padding: moderateScale(10),
    borderRadius: moderateScale(100),
    backgroundColor: colors.backgorund3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    padding: moderateScale(10),
    borderRadius: moderateScale(100),
    backgroundColor: colors.lightred,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: verticalScale(1.5),
    backgroundColor: colors.inputBorder,
    marginVertical: verticalScale(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(4),
  },
  rowKey: {
    color: colors.black,
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    includeFontPadding: false,
    fontSize: moderateScale(14),
  },
  rowValue: {
    color: colors.textGray2,
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    includeFontPadding: false,
    fontSize: moderateScale(14),
  },
  icon: {
    height: moderateScale(15),
    width: moderateScale(15),
  },
});
