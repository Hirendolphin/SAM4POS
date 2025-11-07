import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/fonts';
import { colors } from '../../theme/colors';
import { moderateScale } from '../../theme/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: moderateScale(20),
  },
  paragraph: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(14),
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    includeFontPadding: false,
    lineHeight: moderateScale(19),
    textAlign: 'left',
    color: colors.mutedText,
  },
});
