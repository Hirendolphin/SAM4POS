import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { Icons } from '../../assets/icons';
import { CustomButton } from '../../components/custom-button';
import { colors } from '../../theme/colors';
import styles from './CustomTabbarStyle';
import useCustomTabbar from './useCustomTabbar';

const CustomTabbar = (props: BottomTabBarProps) => {
  const { keyboardState, handleDashboard, handleScan, handleSettings } =
    useCustomTabbar(props);

  return (
    <>
      {!keyboardState && (
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                props?.state?.index === 1 ? colors.black : colors.white,
            },
          ]}
        >
          <View style={styles.innerContainer}>
            <CustomButton
              buttonStyle={[
                styles.button,
                props?.state?.index === 0 && styles.selectedButton,
              ]}
              buttonText={'Dashboard'}
              image={
                props?.state?.index === 0
                  ? Icons.tabSelectedDashboard
                  : Icons.dashboard
              }
              imageStyle={styles.tabIcon}
              pressEvent={handleDashboard}
              textStyle={
                props?.state?.index === 0
                  ? styles.selectedButtonText
                  : styles.buttonText
              }
            />
            <CustomButton
              buttonStyle={[
                styles.button,
                props?.state?.index === 1 && styles.selectedButton,
              ]}
              buttonText={'Scan'}
              image={
                props?.state?.index === 1 ? Icons.tabSelectedScan : Icons.scan
              }
              imageStyle={styles.historyIcon}
              pressEvent={handleScan}
              textStyle={
                props?.state?.index === 1
                  ? styles.selectedButtonText
                  : styles.buttonText
              }
            />
            <CustomButton
              buttonStyle={[
                styles.button,
                props?.state?.index === 2 && styles.selectedButton,
              ]}
              buttonText={'Settings'}
              image={
                props?.state?.index === 2
                  ? Icons.tabSelectedSettings
                  : Icons.settings
              }
              imageStyle={styles.tabIcon}
              pressEvent={handleSettings}
              textStyle={
                props?.state?.index === 2
                  ? styles.selectedButtonText
                  : styles.buttonText
              }
            />
          </View>
        </View>
      )}
    </>
  );
};

export default CustomTabbar;
