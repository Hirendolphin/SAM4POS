import React, { memo } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { colors } from '../theme/colors';
import { moderateScale } from '../theme/Metrics';
import { FontFamily } from '../assets/fonts';

type ProgressType = {
  ismodelVisible: boolean;
  label?: string;
};
const ProgressModal: React.FC<ProgressType> = props => {
  const { ismodelVisible = false, label } = props;

  return (
    <Modal transparent animationType="fade" visible={ismodelVisible}>
      <View style={styles.modelcontainer}>
        <ActivityIndicator color={colors.primary} size={'large'} />
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(25),
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  label: {
    color: colors.white,
    fontSize: moderateScale(15),
    fontFamily: FontFamily.semiBold,
    fontWeight: '500',
    marginTop: moderateScale(10),
  },
});

export default ProgressModal;
