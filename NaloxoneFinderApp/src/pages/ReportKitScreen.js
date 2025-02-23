import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function ReportKitScreen() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  // Function to pick an image from the device
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to get the user's current location
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to report a kit.');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  };

  // Function to handle submission
  const handleSubmit = () => {
    if (!image || !location) {
      Alert.alert('Incomplete Submission', 'Please upload a photo and provide your location.');
      return;
    }

    // TODO: Send the image and location data to Firebase or another backend
    Alert.alert('Success', 'Kit reported successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report a Naloxone Kit</Text>
      <Button title="Upload Photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Get My Location" onPress={getLocation} />
      {location && (
        <Text style={styles.locationText}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  locationText: {
    fontSize: 16,
    marginVertical: 10,
  },
});