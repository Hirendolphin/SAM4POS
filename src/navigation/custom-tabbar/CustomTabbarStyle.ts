import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme/Metrics';
import { FontFamily } from '../../assets/fonts';
import { colors } from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDashboardLable: {
    bottom: moderateScale(15),
    zIndex: 1,
    position: 'absolute',
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: colors.primary,
    fontFamily: FontFamily.semiBold,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 10,
    height: moderateScale(70),
    borderTopLeftRadius: moderateScale(14),
    borderTopRightRadius: moderateScale(14),
    paddingHorizontal: moderateScale(30),
    width: '100%',
  },
  selectedDashboardButtonContainer: {
    backgroundColor: colors.primary,
  },
  dashboardBottomView: {
    zIndex: 0,
    bottom: 0,
    position: 'absolute',
    height: moderateScale(68),
    width: moderateScale(68),
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 10,
    backgroundColor: colors.white,
  },
  tabIcon: {
    height: moderateScale(26),
    width: moderateScale(26),
    resizeMode: 'contain',
  },
  historyIcon: {
    height: moderateScale(22),
    width: moderateScale(38),
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: colors.tablabel,
    marginTop: verticalScale(5),
    fontFamily: FontFamily.semiBold,
  },
  selectedButtonText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: colors.primary,
    marginTop: verticalScale(5),
    fontFamily: FontFamily.semiBold,
  },
  button: {
    width: horizontalScale(79),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyButton: {
    paddingHorizontal: horizontalScale(40),
  },
  topDashboardIcon: {
    height: moderateScale(32),
    width: moderateScale(32),
    resizeMode: 'contain',
  },
  selectedButton: {
    borderTopWidth: 4,
    borderColor: colors.primary,
    backgroundColor: colors.secondLightPrimary,
  },
});
