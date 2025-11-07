import React, { Ref, memo } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FontFamily } from '../assets/fonts';
import { colors } from '../theme/colors';
import { moderateScale } from '../theme/Metrics';

type data = {
  label?: string;
  value?: string;
};

type InputTextComponentType = {
  label?: string;
  boxStyle?: object;
  multiline?: boolean;
  inputStyle?: object;
  inputRef?: Ref<TextInput>;
  inputProps?: TextInputProps;
  placeholdertext?: string;
  labelStyle?: object;
  data?: data[] | [];
  isDropdown?: boolean;
  dropdownProps?: object;
  mainStyle?: object;
  dropdownStyle?: object;
  dropdownIconStyle?: object;
  isSearch?: boolean;
};

const InputTextComponent: React.FC<InputTextComponentType> = props => {
  const {
    label = '',
    boxStyle,
    multiline = false,
    inputStyle,
    inputProps,
    inputRef,
    placeholdertext,
    labelStyle,
    isDropdown = false,
    data,
    dropdownProps,
    mainStyle,
    dropdownStyle,
    dropdownIconStyle,
    isSearch = false,
  } = props;

  return (
    <View style={{ ...mainStyle }}>
      {label != '' ? (
        <View style={styles.LabelContainer}>
          <Text style={[styles.labelTitle, { ...labelStyle }]}>{label}</Text>
        </View>
      ) : null}
      {isDropdown ? (
        <Dropdown
          style={[styles.dropdown, dropdownStyle]}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          placeholderStyle={styles.placeholderStyle}
          data={data}
          search={isSearch}
          autoScroll={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholdertext}
          {...dropdownProps}
          iconStyle={[styles.iconstyle, dropdownIconStyle]}
        />
      ) : (
        <View style={[styles.mainContainer, { ...boxStyle }]}>
          <TextInput
            ref={inputRef}
            placeholderTextColor={colors.placeholder}
            selectionColor={colors.primary}
            placeholder={placeholdertext}
            style={[styles.inputTextStyle, { ...inputStyle }]}
            {...inputProps}
            multiline={multiline}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(5),
    paddingVertical:
      Platform.OS === 'ios' ? moderateScale(8) : moderateScale(0),
  },
  inputTextStyle: {
    color: colors.black,
    fontSize: moderateScale(16),
    paddingLeft: moderateScale(20),
    fontFamily: FontFamily.medium,
    includeFontPadding: false,
  },
  labelTitle: {
    color: colors.label,
    fontSize: moderateScale(14),
    fontWeight: '500',
    fontFamily: FontFamily.medium,
    includeFontPadding: false,
  },
  LabelContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(12),
  },
  eyeBtn: {
    marginHorizontal: moderateScale(5),
    marginEnd: moderateScale(15),
  },
  dropdown: {
    height: moderateScale(40),
    marginTop: moderateScale(5),
    backgroundColor: colors.white,
    borderWidth: moderateScale(1),
    borderColor: colors.inputBorder,
    borderRadius: moderateScale(6),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(10),
  },
  selectedTextStyle: {
    fontSize: moderateScale(12),
    color: colors.black,
    fontFamily: FontFamily.medium,
    fontWeight: '500',
    includeFontPadding: false,
  },
  itemTextStyle: {
    color: colors.black,
    fontSize: moderateScale(13),
    fontFamily: FontFamily.regular,
    includeFontPadding: false,
  },
  placeholderStyle: {
    color: colors.placeholder,
    fontSize: moderateScale(14),
    fontFamily: FontFamily.semiBold,
    includeFontPadding: false,
  },
  iconstyle: {
    height: moderateScale(30),
    width: moderateScale(30),
    tintColor: colors.placeholder,
  },
});
export default memo(InputTextComponent);
