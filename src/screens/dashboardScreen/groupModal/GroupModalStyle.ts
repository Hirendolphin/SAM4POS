import { StyleSheet } from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme/Metrics';
import { colors } from '../../../theme/colors';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(20),
  },

  container: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    paddingBottom: verticalScale(10),
    maxHeight: '80%',
    overflow: 'hidden',
  },

  title: {
    backgroundColor: '#2c2c2c',
    color: 'white',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(15),
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    paddingVertical: verticalScale(14),
    paddingHorizontal: horizontalScale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },

  selectedRow: {
    backgroundColor: '#f3f3f3',
  },

  label: {
    fontSize: moderateScale(15),
    color: '#333',
  },

  selectedLabel: {
    fontWeight: '600',
    color: '#000',
  },

  closeBtn: {
    paddingVertical: verticalScale(15),
    alignItems: 'center',
  },

  closeText: {
    fontSize: moderateScale(16),
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
