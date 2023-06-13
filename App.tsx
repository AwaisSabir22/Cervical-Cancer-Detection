/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import LoadingScreen from './LoadingScreen';
import { NavigationContainer } from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainPage from './MainPage';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
//import stack navigator

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack= createStackNavigator();

  return (
    
    
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Loading">
         <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
         <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
       </Stack.Navigator>
     </NavigationContainer>
  

  );
}

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
