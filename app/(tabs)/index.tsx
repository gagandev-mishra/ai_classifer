import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Vision Demo 👁️</Text>
      <Text style={styles.subHeader}>
        Get ready to witness React Native flexing its muscles with ResNet, YOLO, and LLM – all in one app!
      </Text>

      <Text style={styles.description}>
        It’s like giving your phone superpowers. 🤖 Want to see it predict, detect, and even tell stories? Keep reading.
      </Text>

      <Text style={styles.sectionHeader}>1️⃣ ResNet</Text>
      <Text style={styles.sectionDescription}>
        Want to see a computer “see” better than you? Check out ResNet for image magic.
      </Text>

      <Text style={styles.sectionHeader}>2️⃣ YOLO</Text>
      <Text style={styles.sectionDescription}>
        YOLO is here for super-accurate predictions! No cap. 🚀
      </Text>

      <Text style={styles.sectionHeader}>3️⃣ LLM</Text>
      <Text style={styles.sectionDescription}>
        LLM doesn’t just see – it tells stories. Yup, stories. 📖
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#b9fbc0',
    marginBottom: 20,
    marginTop:30,
  },
  subHeader: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#c0c0c0',
    textAlign: 'left',
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#c0c0c0',
    textAlign: 'left',
    marginBottom: 10,
  },
});
