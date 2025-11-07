import { StyleSheet } from 'react-native';
import { FontFamily } from '../../../assets/fonts';
import { colors } from '../../../theme/colors';
import { moderateScale } from '../../../theme/Metrics';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    width: '100%',
    maxHeight: '90%',
    overflow: 'hidden',
    padding: moderateScale(14),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    color: colors.black,
    includeFontPadding: false,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeImage: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  scrollView: {
    maxHeight: moderateScale(500),
  },
  spacer: {
    height: moderateScale(12),
  },
});
