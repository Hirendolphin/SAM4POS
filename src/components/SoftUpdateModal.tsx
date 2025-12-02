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
import { Icons } from '../assets/icons';
import { Images } from '../assets/images';
import { PrimaryButton } from './PrimaryButton';

type PermissionModalType = {
  visible: boolean;
};

const SoftUpdateModal: FC<PermissionModalType> = ({ visible }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modelcontainer}>
        <View style={styles.modelview}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.closeBtnStyle}
            // onPress={onCloseModal}
          >
            <Image
              source={Icons.close}
              style={styles.closeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image
            source={Images.softupdateImage}
            style={styles.imageStyle}
            resizeMode="center"
          />
          <Text allowFontScaling={false} style={styles.label}>
            {`New Update Available`}
          </Text>
          <Text allowFontScaling={false} style={styles.labelContent}>
            {`We’ve improved performance and fixed a few issues to make your experience better.`}
          </Text>
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
    padding: moderateScale(20),
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modelview: {
    width: '100%',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(18),
    borderRadius: moderateScale(15),
    backgroundColor: colors.white,
  },
  closeBtnStyle: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    alignSelf: 'flex-end',
  },
  closeIcon: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  imageStyle: {
    alignSelf: 'center',
    marginBottom: moderateScale(15),
  },
  label: {
    fontFamily: FontFamily.medium,
    fontWeight: '500',
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

export default SoftUpdateModal;
