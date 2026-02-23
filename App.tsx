import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Theme } from './src/theme/Theme';
import { RootStackParamList } from './src/navigation/types';

import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { ProviderOptionsScreen } from './src/screens/ProviderOptionsScreen';
import { ConfigurationScreen } from './src/screens/ConfigurationScreen';
import { MainDashboardScreen } from './src/screens/MainDashboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Theme.colors.background,
    card: Theme.colors.surface,
    text: Theme.colors.text,
  },
};

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: Theme.colors.surface,
            },
            headerTintColor: Theme.colors.text,
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProviderOptions"
            component={ProviderOptionsScreen}
            options={{ title: 'Select Provider', headerBackTitle: 'Back' }}
          />
          <Stack.Screen
            name="Configuration"
            component={ConfigurationScreen}
            options={{ title: 'Configuration', headerBackTitle: 'Provider' }}
          />
          <Stack.Screen
            name="Dashboard"
            component={MainDashboardScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
