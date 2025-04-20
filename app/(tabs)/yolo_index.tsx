import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';

import CustomButton from '../../components/CustomButton';
import ImageContainer from '../../components/ImageContainer';
import HeaderText from '../../components/HeaderText';
import CameraHandler from '@/components/CameraHandler';
import { Stack } from 'expo-router';

const PlaceholderImage = require('@/assets/images/demo_cat.jpg');

export default function Yolo() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      classify(result.assets[0].uri);
    }
  };

  const usePlaceholderImage = async () => {
    const asset = Asset.fromModule(PlaceholderImage);
    await asset.downloadAsync(); // ensure it's available locally
    const localUri = asset.localUri || asset.uri;
    setImageUri(localUri);
    classify(localUri);
  };

  const classify = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const res = await fetch('http://192.168.1:37:8000/yolo-classify/', {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = await res.json()
      console.log('Response from server:', data);

      // Safeguard if results are undefined or empty
      if (data.results) {
        setResults(data.results);
      } else {
        console.warn('❌ No results found or an error occurred:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error("Error in classify:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: "YOLO", headerShown: false }} />
      <HeaderText title="YOLO" />
      <ImageContainer uri={imageUri ?? undefined} fallback={PlaceholderImage} />

      <View style={styles.buttonRow}>
      <CustomButton title="Pick Image" onPress={pickImage} />
      <CameraHandler onImageCaptured={(uri) => {
        setImageUri(uri);
        classify(uri);}} />      
      </View>
      <CustomButton title="Use this Photo" onPress={usePlaceholderImage} />
      
      {results.length > 0 && results.map((r, i) => (
        <Text key={i} style={styles.resultText}>
          {r.label}: {(r.confidence * 100).toFixed(2)}%
        </Text>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#25292e',
    flexGrow: 1,
    alignItems: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  
  resultText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
});
