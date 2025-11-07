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
    paddingHorizontal: moderateScale(20),
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    width: '100%',
    padding: moderateScale(20),
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeImage: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  warningImage: {
    height: moderateScale(64),
    width: moderateScale(64),
  },
  message: {
    color: colors.placeholder,
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    fontSize: moderateScale(16),
    marginTop: moderateScale(15),
  },
  barcodeText: {
    color: colors.primary,
    fontSize: moderateScale(16),
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    includeFontPadding: false,
    marginTop: moderateScale(3),
  },
  buttonContainer: {
    width: '100%',
    marginTop: moderateScale(15),
  },
});
