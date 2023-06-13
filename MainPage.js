import React, { useState } from 'react';
import { ImageBackground,View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';

const MainPage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(null);

  //choose image from gallery and send to server
  const handleChooseImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        cropping: true,
        includeBase64: false,
        cropperCircleOverlay: false,
        compressImageQuality: 0.7,
      });

      const formData = new FormData();
      formData.append('image', {
        uri: image.path,
        type: image.mime,
        name: 'image.jpg',
      });

      setImageUri(image.path);
      saveImage(image.path);
  
      const response = await axios.post('http://172.17.50.43:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Image uploaded to Python server:', response.data);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.log('Error selecting image:', error);
    }




    
  };


  //saving image to directory
  const saveImage = async uri => {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  
    try {
      await RNFS.copyFile(uri, destPath);
      console.log(`Image saved to ${destPath}`);
     // sendImageToServer(destPath);
    } catch (error) {
      console.error(error);
    }
  };


  //selecting image from directory
  return (
    <ImageBackground
    source={require('../Project_DIP/images/background.jpg')}
    style={{ flex: 1 }}
  >
    <View style={styles.container}>
      <Text style={{ fontSize: 22, marginBottom: 20, color: 'white' }}>
        Kindly upload an image 
         to run diagnostics
      </Text>
      <TouchableOpacity onPress={handleChooseImage}>
        <Image
          source={require('../Project_DIP/images/camera.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      {prediction && (
      <Text style={{ fontSize: 20, marginTop: 20 ,color:'white'}}>
        Prediction: {JSON.stringify(prediction)}
      </Text>
    )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default MainPage;
