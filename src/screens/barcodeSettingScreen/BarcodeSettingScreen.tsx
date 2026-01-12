import { StyleSheet, Text, View } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { colors } from '../../theme/colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomSwitch from '../../components/CustomSwitch';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme/Metrics';
import { FontFamily } from '../../assets/fonts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateBarcodeSetting } from '../../redux/actions/barcodeSettingAction';

const BarcodeSettingScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const { barcodeSettings }: any = useAppSelector(state => ({
    barcodeSettings: state?.barcodeSetting || {},
  }));
  return (
    <View style={styles.mainContainer}>
      <HeaderComponent
        title="Barcode Settings"
        onPressBack={() => navigation.dispatch(CommonActions.goBack())}
      />

      <View style={styles.content}>
        {/* UPC-A SETTINGS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>UPC-A</Text>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Transmit Leading Digit</Text>
            <CustomSwitch
              value={barcodeSettings['upc-a'].transmitLeadingDigit}
              onValueChange={value =>
                dispatch(
                  updateBarcodeSetting({
                    barcodeType: 'upc-a',
                    key: 'transmitLeadingDigit',
                    value,
                  }),
                )
              }
            />
          </View>

          <View style={[styles.menuItem, styles.noBorder]}>
            <Text style={styles.menuText}>Transmit Check Digit</Text>
            <CustomSwitch
              value={barcodeSettings['upc-a'].transmitCheckDigit}
              onValueChange={value =>
                dispatch(
                  updateBarcodeSetting({
                    barcodeType: 'upc-a',
                    key: 'transmitCheckDigit',
                    value,
                  }),
                )
              }
            />
          </View>
        </View>

        {/* UPC-E SETTINGS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>UPC-E</Text>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Transmit Leading Digit</Text>
            <CustomSwitch
              value={barcodeSettings['upc-e'].transmitLeadingDigit}
              onValueChange={value =>
                dispatch(
                  updateBarcodeSetting({
                    barcodeType: 'upc-e',
                    key: 'transmitLeadingDigit',
                    value,
                  }),
                )
              }
            />
          </View>

          <View style={[styles.menuItem, styles.noBorder]}>
            <Text style={styles.menuText}>Transmit Check Digit</Text>
            <CustomSwitch
              value={barcodeSettings['upc-e'].transmitCheckDigit}
              onValueChange={value =>
                dispatch(
                  updateBarcodeSetting({
                    barcodeType: 'upc-e',
                    key: 'transmitCheckDigit',
                    value,
                  }),
                )
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: moderateScale(20),
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(20),
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    color: colors.primary,
    includeFontPadding: false,
    fontFamily: FontFamily.medium,
    marginBottom: verticalScale(10),
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderColor: colors.inputBorder,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: moderateScale(15),
    color: colors.textGray,
    fontFamily: FontFamily.medium,
    includeFontPadding: false,
  },
});

export default BarcodeSettingScreen;
