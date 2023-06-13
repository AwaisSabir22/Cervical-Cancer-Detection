import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ImageBackground, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainPage from './MainPage';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Your loading logic here
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleButtonPress = () => {
    navigation.navigate('MainPage'); // Replace 'NewPage' with your desired screen name
  }

  return (
    <ImageBackground source={require('../Project_DIP/images/load_background.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Click to Begin" onPress={handleButtonPress} />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',

      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
