import React from 'react';
import { Image, View } from 'react-native';
import styles from './TabHeaderStyle';
import useTabHeader from './useTabHeader';
import { Images } from '../../assets/images';
import { colors } from '../../theme/colors';
import { useRoute } from '@react-navigation/native';

const TabHeader = () => {
  const {} = useTabHeader();
  const route = useRoute();

  return (
    <View
      style={{
        backgroundColor: route.name === 'Scan' ? colors.black : colors.white,
      }}
    >
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={Images.logo}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default TabHeader;
