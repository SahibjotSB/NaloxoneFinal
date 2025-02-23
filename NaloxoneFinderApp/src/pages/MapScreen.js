import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Default coordinates (e.g., San Francisco)
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Example marker for a naloxone kit */}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Naloxone Kit"
          description="Verified location"
        />
        {/* Add more markers dynamically based on Firestore data */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});