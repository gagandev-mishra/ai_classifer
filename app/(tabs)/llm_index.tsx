import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import CustomButton from '../../components/CustomButton';
import ImageContainer from '../../components/ImageContainer';
import HeaderText from '../../components/HeaderText';
import CameraHandler from '@/components/CameraHandler';
import { Stack } from 'expo-router';

const PlaceholderImage = require('@/assets/images/demo_cat.jpg');

export default function LLMImageCaptioner() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      clearResults();
      setImageUri(result.assets[0].uri);
      classify(result.assets[0].uri);
    }
  };


  const clearResults = () => {
    setDescription(null);
    setCaption(null);
  };

  const classify = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    } as any);

    const res = await fetch('http://192.168.1.37:8000/generate-caption/', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('Response status:', res.status);
    
    const data = await res.json(); // ✅ Now it works because we didn’t read the body earlier
    console.log('Parsed response:', data);
    
    setDescription(data.description);
    setCaption(data.caption);

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderText title="Gemini Objection/Caption Generator" />
      <Stack.Screen options={{ title: "LLM", headerShown: false }} />
      <ImageContainer uri={imageUri ?? undefined} fallback={PlaceholderImage} />

      <View style={styles.buttonRow}>
        <CustomButton title="Pick Image" onPress={pickImage} />
        <CameraHandler onImageCaptured={(uri) => {
          setImageUri(uri);
          classify(uri);}} />      
          </View>
      {description && (
        <Text style={styles.resultText}>
          🔍 Object: {description}
        </Text>
      )}

      {caption && (
        <Text style={styles.resultText}>
        🗨️ Caption: {caption}
        </Text>
      )}
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
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
