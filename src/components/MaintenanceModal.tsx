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
import { Images } from '../assets/images';
import { moderateScale } from '../theme/Metrics';
import { colors } from '../theme/colors';
import { FontFamily } from '../assets/fonts';

type PermissionModalType = {
  visible: boolean;
};

const MaintenanceModal: FC<PermissionModalType> = ({ visible }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modelcontainer}>
        <View style={styles.modelview}>
          <View style={styles.innerContainer}>
            <Image source={Images.maintenanceImage} resizeMode="center" />
            <Text allowFontScaling={false} style={styles.label}>
              {`Scheduled Maintenance`}
            </Text>
            <Text allowFontScaling={false} style={styles.labelContent}>
              {`We’re doing some quick maintenance to keep things running smoothly. Please try again in a little while.`}
            </Text>
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
  innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
});

export default MaintenanceModal;
