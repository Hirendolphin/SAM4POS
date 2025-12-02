import React, { FC } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { resetToAuth } from '../navigation/RootNavigationRef';
import { userLogout } from '../redux/actions/authAction';
import { useAppDispatch } from '../redux/hooks';
import { PrimaryButton } from './PrimaryButton';
import { moderateScale } from '../theme/Metrics';
import { colors } from '../theme/colors';
import { FontFamily } from '../assets/fonts';

type PermissionModalType = {
  visible: boolean;
};

const ForceLogoutComponent: FC<PermissionModalType> = ({ visible }) => {
  const dispatch = useAppDispatch();
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modelcontainer}>
        <View style={styles.modelview}>
          <Text allowFontScaling={false} style={styles.label}>
            Logout
          </Text>
          <Text allowFontScaling={false} style={styles.labelContent}>
            You’ve been forcefully logged out as your account was logged in on
            another device.
          </Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={'OK'}
              onPress={() => {
                dispatch(userLogout());
                resetToAuth();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20),
    backgroundColor: colors.overlay,
  },
  modelview: {
    width: '100%',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(18),
    borderRadius: moderateScale(15),
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: colors.black,
    includeFontPadding: false,
    textAlign: 'center',
  },
  labelContent: {
    fontFamily: FontFamily.semiBold,
    fontSize: moderateScale(12),
    fontWeight: '600',
    includeFontPadding: false,
    color: colors.black,
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(5),
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: moderateScale(15),
  },
  btnstyle: {
    flex: 1,
    paddingVertical: moderateScale(10),
    marginHorizontal: moderateScale(5),
  },
});

export default ForceLogoutComponent;
