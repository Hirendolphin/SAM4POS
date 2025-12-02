import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme/Metrics';
import { colors } from '../../theme/colors';
import { FontFamily } from '../../assets/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    margin: moderateScale(15),
    padding: moderateScale(5),
  },

  card: {
    backgroundColor: colors.white,
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(15),
    elevation: 3,
  },

  inputWrapper: {
    marginBottom: verticalScale(18),
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    marginBottom: verticalScale(4),
    color: colors.black,
    fontSize: moderateScale(14),
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    includeFontPadding: false,
  },

  counter: {
    color: colors.label,
    fontFamily: FontFamily.medium,
    fontWeight: '500',
    fontSize: moderateScale(12),
    includeFontPadding: false,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: moderateScale(1.2),
    borderColor: colors.inputBorder,
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(10),
    height: verticalScale(46),
  },

  input: {
    flex: 1,
    color: colors.black,
    fontSize: moderateScale(16),
    fontFamily: FontFamily.medium,
    includeFontPadding: false,
  },

  readonlyText: {
    color: colors.label,
    fontSize: moderateScale(15),
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    includeFontPadding: false,
  },

  clearIcon: {
    fontSize: moderateScale(17),
    padding: moderateScale(4),
    color: colors.label,
    includeFontPadding: false,
  },

  sectionBar: {
    backgroundColor: colors.backgorund3,
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(8),
    marginTop: moderateScale(10),
    borderRadius: moderateScale(5),
  },

  sectionTitle: {
    fontSize: moderateScale(16),
    color: colors.black,
    marginLeft: horizontalScale(12),
    fontWeight: '700',
    fontFamily: FontFamily.bold,
    includeFontPadding: false,
  },

  row: {
    backgroundColor: colors.background,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    borderRadius: moderateScale(2),
    marginBottom: verticalScale(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowLabel: {
    fontSize: moderateScale(13),
    color: colors.label,
    includeFontPadding: false,
  },

  rowValue: {
    fontSize: moderateScale(15),
    marginTop: verticalScale(4),
    color: colors.black,
    includeFontPadding: false,
  },

  editIcon: {
    fontSize: moderateScale(20),
    includeFontPadding: false,
  },

  gotoButton: {
    height: moderateScale(40),
    borderRadius: moderateScale(200),
    width: moderateScale(40),
    backgroundColor: colors.secondLightPrimary,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },

  gotoText: {
    color: colors.white,
    fontWeight: 'bold',
    includeFontPadding: false,
  },

  addButtonRow: {
    alignItems: 'flex-end',
    padding: moderateScale(5),
  },

  addButton: {
    backgroundColor: colors.LightPrimary,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(18),
    borderRadius: moderateScale(6),
  },

  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    includeFontPadding: false,
  },

  /* Table Header */
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.LightPrimary,
    paddingVertical: verticalScale(10),
    paddingLeft: horizontalScale(12),
  },

  headerText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: moderateScale(13),
    includeFontPadding: false,
  },

  /* Table Rows */
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingLeft: horizontalScale(12),
    borderBottomWidth: moderateScale(1),
    borderColor: colors.inputBorder,
  },

  cell: {
    fontSize: moderateScale(14),
    color: colors.black,
    includeFontPadding: false,
  },

  /* Edit Button */
  editButton: {
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(6),
  },

  editButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollContent: {
    paddingBottom: 50,
  },

  priceSectionWrapper: {
    paddingBottom: moderateScale(20),
  },

  saveButton: {
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
  },

  /* Column Widths */
  col12: { width: '10%' },
  col50: { width: '45%' },
  col50Bold: { width: '45%', fontWeight: 'bold' },
  col15: { width: '20%' },
  col10: { width: '10%' },

  actions: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  editBtn: {
    padding: moderateScale(10),
    borderRadius: moderateScale(100),
    backgroundColor: colors.backgorund3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    padding: moderateScale(10),
    borderRadius: moderateScale(100),
    backgroundColor: colors.lightred,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: moderateScale(15),
    width: moderateScale(15),
  },
});
