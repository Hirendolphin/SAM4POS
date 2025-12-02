import { FC } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../redux/hooks';
import { moderateScale } from '../theme/Metrics';
import { colors } from '../theme/colors';
import { FontFamily } from '../assets/fonts';
import { PrimaryButton } from './PrimaryButton';
import { Images } from '../assets/images';

type PermissionModalType = {
  visible: boolean;
};

const ForceUpdateModal: FC<PermissionModalType> = ({ visible }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modelcontainer}>
        <View style={styles.modelview}>
          <View style={styles.innerContainer}>
            <Image source={Images.forceUpdateImage} resizeMode="center" />
            <Text allowFontScaling={false} style={styles.label}>
              Update Required
            </Text>
            <Text allowFontScaling={false} style={styles.labelContent}>
              {`This version of the app is no longer supported.\nPlease update to continue using the app.`}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Update Now"
              onPress={() => {}}
              style={styles.btnstyle}
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modelview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(18),
    backgroundColor: colors.white,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: FontFamily.medium,
    fontWeight: '500',
    marginTop: moderateScale(15),
    fontSize: moderateScale(16),
    color: colors.black,
    textAlign: 'center',
  },
  labelContent: {
    fontFamily: FontFamily.regular,
    fontWeight: '400',
    fontSize: moderateScale(12),
    color: colors.black,
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(5),
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(15),
  },
  btnstyle: {
    flex: 1,
    paddingVertical: moderateScale(10),
    marginHorizontal: moderateScale(5),
  },
  labelBtn: {
    fontSize: moderateScale(15),
  },
});

export default ForceUpdateModal;
