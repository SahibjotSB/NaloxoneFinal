import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Naloxone Kit Finder</Text>
      <Button title="Report a Kit" onPress={() => navigation.navigate('ReportKit')} />
      <Button title="Live Overdose Map" onPress={() => navigation.navigate('Map')} />
      <Button title="Help Chatbot" onPress={() => navigation.navigate('Chatbot')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});