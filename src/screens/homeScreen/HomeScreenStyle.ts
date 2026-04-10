import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { FontFamily } from '../../assets/fonts';
import { moderateScale, verticalScale } from '../../theme/Metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Or another brand background
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(20),
  },
  header: {
    fontSize: moderateScale(26),
    fontFamily: FontFamily.bold,
    color: colors.black,
    marginBottom: moderateScale(30),
    textAlign: 'center',
    marginTop: verticalScale(40),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    marginBottom: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: moderateScale(15),
    fontFamily: FontFamily.semiBold,
    color: colors.black,
    marginBottom: moderateScale(4),
  },
  cardSubtitle: {
    fontSize: moderateScale(13),
    fontFamily: FontFamily.medium,
    color: colors.textGray,
  },
  iconImage: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginLeft: moderateScale(16),
    tintColor: colors.primary,
  },
});

export default styles;
