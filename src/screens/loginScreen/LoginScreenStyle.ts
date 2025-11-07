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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: horizontalScale(24),
  },
  card: {
    width: '100%',
    borderRadius: moderateScale(20),
    backgroundColor: colors.white,
    padding: moderateScale(24),
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(20),
    shadowOffset: { width: 0, height: verticalScale(10) },
    elevation: 6,
  },
  brand: {
    fontSize: moderateScale(44),
    color: colors.primary,
    fontWeight: '800',
    fontFamily: FontFamily.medium,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: verticalScale(6),
    textAlign: 'center',
    color: colors.mutedText,
    fontFamily: FontFamily.medium,
    fontWeight: '500',
    fontSize: moderateScale(18),
    includeFontPadding: false,
  },
  spacer16: { height: verticalScale(16) },
  spacer12: { height: verticalScale(12) },
  rememberRow: {
    marginVertical: verticalScale(16),
  },
  error: {
    color: colors.red,
    marginTop: verticalScale(6),
    marginBottom: verticalScale(4),
    fontSize: moderateScale(14),
    includeFontPadding: false,
  },
});
