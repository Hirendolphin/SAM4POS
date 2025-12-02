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
    backgroundColor: colors.black,
  },
  cameraContainer: {
    flex: 1,
  },
  flashButton: {
    backgroundColor: colors.backgorund3,
    padding: moderateScale(8),
    alignSelf: 'flex-end',
    borderRadius: moderateScale(100),
    marginRight: moderateScale(15),
    position: 'absolute',
    zIndex: 1,
    marginTop: verticalScale(15),
  },
  cameraView: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: colors.black,
  },
  alignText: {
    fontSize: moderateScale(13),
    fontFamily: FontFamily.medium,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    textAlignVertical: 'center',
    marginTop: verticalScale(35),
    includeFontPadding: false,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(14),
    marginHorizontal: horizontalScale(20),
    marginBottom: verticalScale(15),
    borderRadius: moderateScale(10),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  productCard: {
    paddingVertical: moderateScale(9),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    elevation: moderateScale(3),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  productName: {
    color: colors.primary,
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    includeFontPadding: false,
    fontSize: moderateScale(14),
  },
  divider: {
    backgroundColor: colors.inputBorder,
    height: 1,
    marginVertical: moderateScale(8),
  },
  addButton: {
    marginTop: moderateScale(15),
  },
  noMatchCard: {
    paddingVertical: moderateScale(9),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    elevation: moderateScale(3),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  noMatchText: {
    color: colors.primary,
    fontSize: moderateScale(14),
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    includeFontPadding: false,
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
  enterButton: {
    marginTop: moderateScale(15),
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
});
