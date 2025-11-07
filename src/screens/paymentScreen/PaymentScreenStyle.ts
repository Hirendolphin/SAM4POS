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
    paddingHorizontal: horizontalScale(24),
    paddingTop: verticalScale(24),
  },
  title: {
    color: colors.primary,
    fontSize: moderateScale(24),
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
  },
  subtitle: {
    marginTop: verticalScale(8),
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: FontFamily.medium,
    color: colors.mutedText,
    fontSize: moderateScale(13),
    includeFontPadding: false,
  },
  planCard: {
    marginTop: moderateScale(30),
    borderRadius: moderateScale(18),
    backgroundColor: colors.background,
    padding: moderateScale(16),
  },
  planHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(12),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: horizontalScale(10),
  },
  imageStyle: {
    height: moderateScale(10),
    width: moderateScale(10),
  },
  planTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    color: colors.black,
    flex: 1,
    includeFontPadding: false,
  },
  pill: {
    marginTop: moderateScale(-50),
    backgroundColor: colors.primary,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(100),
  },
  pillText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: moderateScale(13),
    fontFamily: FontFamily.semiBold,
    includeFontPadding: false,
  },
  bullets: {
    marginTop: verticalScale(12),
    marginLeft: moderateScale(24),
    justifyContent: 'center',
  },
  bullet: {
    marginVertical: verticalScale(2),
    color: colors.mutedText,
    fontSize: moderateScale(13),
    fontFamily: FontFamily.medium,
    includeFontPadding: false,
    fontWeight: '500',
  },
  bulletsView: {
    height: moderateScale(5),
    width: moderateScale(5),
    alignSelf: 'center',
    backgroundColor: colors.black,
    borderRadius: moderateScale(10),
    marginEnd: moderateScale(4),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  price: {
    marginLeft: moderateScale(24),
    marginTop: verticalScale(14),
    fontSize: moderateScale(20),
    fontWeight: '700',
    fontFamily: FontFamily.bold,
    color: colors.black,
    includeFontPadding: false,
  },
  couponRowWrap: {
    flex: 1,
    marginTop: verticalScale(20),
  },
  couponLabel: {
    color: colors.text,
    marginBottom: verticalScale(8),
    fontSize: moderateScale(14),
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  applyBtn: {
    marginLeft: moderateScale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(24),
    borderRadius: moderateScale(10),
  },
  subscribeBtn: {
    marginTop: verticalScale(24),
  },
  skip: {
    marginTop: verticalScale(16),
    textAlign: 'center',
    color: colors.primary,
    fontSize: moderateScale(16),
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    includeFontPadding: false,
  },
  marginBottom: {
    marginBottom: moderateScale(30),
  },
});
