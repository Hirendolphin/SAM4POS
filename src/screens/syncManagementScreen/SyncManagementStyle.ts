import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { horizontalScale, moderateScale, verticalScale } from '../../theme/Metrics';
import { FontFamily } from '../../assets/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingTop: moderateScale(15),
    paddingHorizontal: moderateScale(20),
  },
  sectionHeader: {
    marginVertical: verticalScale(15),
    backgroundColor: colors.backgorund3,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(12),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(6),
  },
  sectionHeaderText: {
    color: colors.black,
    fontFamily: FontFamily.bold,
    includeFontPadding: false,
    fontWeight: '700',
    fontSize: moderateScale(16),
  },
  listContainer: {
    paddingBottom: moderateScale(130), // padding for the bottom action bar
  },
  card: {
    backgroundColor: colors.white,
    paddingVertical: verticalScale(9),
    paddingHorizontal: horizontalScale(12),
    marginVertical: moderateScale(5),
    marginHorizontal: moderateScale(5),
    borderRadius: moderateScale(10),
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(10),
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pluLine: {
    color: colors.text,
    flex: 1,
    includeFontPadding: false,
  },
  pluKey: {
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    fontSize: moderateScale(14),
    color: colors.primary,
    includeFontPadding: false,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  separator: {
    height: verticalScale(1.5),
    backgroundColor: colors.inputBorder,
    marginVertical: verticalScale(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(4),
    flexWrap: 'wrap',
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
    flexWrap: 'wrap',
  },
  badgeContainer: {
    paddingHorizontal: horizontalScale(4),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(4),
    marginLeft: horizontalScale(10),
    flexShrink: 0,
    minWidth: moderateScale(65),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: moderateScale(12),
    fontFamily: FontFamily.semiBold,
    color: colors.white,
  },
  badgeAdd: {
    backgroundColor: colors.verified, // green
  },
  badgeEdit: {
    backgroundColor: colors.yellow, // orange
  },
  badgeUpdate: {
    backgroundColor: colors.primary, // blue
  },
  badgeDelete: {
    backgroundColor: colors.red, // blue
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the button since checkbox moved
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.devider,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  syncButton: {
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    borderRadius: moderateScale(8),
  },
  syncButtonDisabled: {
    flex: 1,
    backgroundColor: colors.inputBorder,
  },
  syncButtonText: {
    color: colors.white,
    fontSize: moderateScale(16),
    fontFamily: FontFamily.semiBold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(100),
  },
  emptyText: {
    fontSize: moderateScale(16),
    fontFamily: FontFamily.medium,
    color: colors.text,
    marginTop: verticalScale(20),
  },
  emptyIcon: {
    width: moderateScale(60),
    height: moderateScale(60),
    tintColor: colors.text,
    opacity: 0.5,
  }
});

export default styles;
