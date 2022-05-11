import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingPage from './features/pages/landing';
import LoginPage from './features/pages/login';
import SignupPage from './features/pages/signup';
import HomePage from './features/pages/home';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() == 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={'Landing'} component={LandingPage} />
          <Stack.Screen name={'Login'} component={LoginPage} />
          <Stack.Screen name={'Signup'} component={SignupPage} />
          <Stack.Screen name={'Home'} component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
