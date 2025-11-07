import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { Routes } from '../../constants';
import { GlobalMetrics } from '../../theme/Metrics';
const useCustomTabbar = (props: BottomTabBarProps) => {
  const [keyboardState, setKeyboardState] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 2000);
  // }, []);

  useEffect(() => {
    if (GlobalMetrics.isAndroid) {
      const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () =>
        setKeyboardState(true),
      );

      const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () =>
        setKeyboardState(false),
      );

      return () => {
        keyboardDidShow.remove();
        keyboardDidHide.remove();
      };
    }
  }, []);

  const handleDashboard = () => {
    props.navigation.dispatch(TabActions.jumpTo(Routes.dashboard));
  };
  const handleScan = () => {
    props.navigation.dispatch(TabActions.jumpTo(Routes.scan));
  };
  const handleSettings = () => {
    props.navigation.dispatch(TabActions.jumpTo(Routes.settings));
  };

  return {
    keyboardState,
    handleDashboard,
    handleScan,
    handleSettings,
  };
};

export default useCustomTabbar;
