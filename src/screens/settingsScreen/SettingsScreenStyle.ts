import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/fonts';
import { colors } from '../../theme/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme/Metrics';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flexGrow: 1,
    padding: moderateScale(20),
  },
  dealerCard: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(13),
    paddingHorizontal: horizontalScale(12),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dealerLabel: {
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: colors.black,
    flex: 1,
    includeFontPadding: false,
  },
  dealerId: {
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: colors.textGray2,
    includeFontPadding: false,
  },
  freeCard: {
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(15),
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
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    marginTop: moderateScale(15),
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    padding: moderateScale(12),
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(8),
    borderBottomWidth: 1,
    borderColor: colors.inputBorder,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: moderateScale(16),
    color: colors.textGray,
    fontWeight: '500',
    fontFamily: FontFamily.medium,
    includeFontPadding: false,
  },
  versionText: {
    fontSize: moderateScale(13),
    fontWeight: '400',
    fontFamily: FontFamily.regular,
    color: colors.textGray,
  },
  logoutBtn: {
    backgroundColor: colors.lightred2,
    marginHorizontal: horizontalScale(20),
    marginBottom: moderateScale(20),
  },
});
