/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
