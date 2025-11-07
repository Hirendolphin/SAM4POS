import { StyleSheet } from 'react-native';
import { moderateScale } from '../../theme/Metrics';
import { colors } from '../../theme/colors';

export default StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: moderateScale(60),
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 8,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: moderateScale(150),
    height: moderateScale(50),
  },
  notificationButton: {
    backgroundColor: colors.primary,
    padding: moderateScale(7),
    borderRadius: moderateScale(5),
  },
  notificationIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
  },
});
