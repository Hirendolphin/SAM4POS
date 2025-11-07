import { FC, memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icons } from '../assets/icons';
import { colors } from '../theme/colors';
import { moderateScale } from '../theme/Metrics';
import { FontFamily } from '../assets/fonts';
type HeaderComponenttype = {
  title: string;
  onPressBack?: () => void;
};
const HeaderComponent: FC<HeaderComponenttype> = props => {
  const { title, onPressBack } = props;
  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.backBtn} onPress={onPressBack}>
        <Image source={Icons.arrowLeft} />
      </Pressable>
      <Text style={styles.labelTitle}>{title}</Text>
      <View style={styles.rightView} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: moderateScale(60),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 8,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  backBtn: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: colors.backgorund3,
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(5),
  },
  labelTitle: {
    fontWeight: '700',
    fontFamily: FontFamily.bold,
    fontSize: moderateScale(18),
    color: colors.black,
    includeFontPadding: false,
    textAlign: 'center',
    flex: 1,
  },
  rightView: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
});

export default memo(HeaderComponent);
