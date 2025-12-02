import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/fonts';
import { colors } from '../../theme/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: moderateScale(20),
  },

  freeCard: {
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
    backgroundColor: colors.lightyellow,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconSmall: {
    height: moderateScale(18),
    width: moderateScale(18),
  },
  freeText: {
    color: colors.yellow,
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    fontSize: moderateScale(14),
    marginLeft: moderateScale(10),
    includeFontPadding: false,
  },
  divider: {
    height: 1,
    backgroundColor: colors.devider,
    marginVertical: moderateScale(10),
  },
  freeDesc: {
    color: colors.black,
    fontSize: moderateScale(14),
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    includeFontPadding: false,
  },
  manageBtn: {
    marginTop: moderateScale(20),
  },

  lastSyncContainer: {
    marginTop: moderateScale(10),
    backgroundColor: colors.backgorund2,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(12),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(5),
  },
  lastSyncText: {
    color: colors.black,
    fontFamily: FontFamily.semiBold,
    includeFontPadding: false,
    fontWeight: '600',
    fontSize: moderateScale(14),
    flex: 1,
  },
  refreshButton: {
    backgroundColor: colors.primary,
    borderRadius: moderateScale(4),
    padding: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshIcon: {
    height: moderateScale(15),
    width: moderateScale(15),
  },

  pluHeader: {
    marginVertical: verticalScale(15),
    backgroundColor: colors.backgorund3,
    paddingVertical: verticalScale(7),
    paddingHorizontal: horizontalScale(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
  pluHeaderText: {
    color: colors.black,
    fontFamily: FontFamily.bold,
    includeFontPadding: false,
    fontWeight: '700',
    fontSize: moderateScale(16),
    flex: 1,
  },

  listContainer: {
    paddingBottom: moderateScale(60),
    paddingTop: moderateScale(15),
  },

  addButton: {
    height: moderateScale(66),
    width: moderateScale(66),
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: moderateScale(15),
    right: moderateScale(15),
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  addIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  addText: {
    color: colors.white,
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    fontSize: moderateScale(12),
    includeFontPadding: false,
    marginTop: moderateScale(3),
  },
});
