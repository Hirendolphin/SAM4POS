import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/dashboardScreen/DashboardScreen';
import ScanScreen from '../screens/scanScreen/ScanScreen';
import SettingsScreen from '../screens/settingsScreen/SettingsScreen';
import { Routes } from '../constants';
import { CustomTabbar } from './custom-tabbar';
import { TabHeader } from './tab-header';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      // initialRouteName={Routes.dashboard}
      tabBar={props => <CustomTabbar {...props} />}
      screenOptions={{
        header: () => <TabHeader />,
      }}
    >
      <Tab.Screen name={Routes.dashboard} component={DashboardScreen} />
      <Tab.Screen name={Routes.scan} component={ScanScreen} />
      <Tab.Screen name={Routes.settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
