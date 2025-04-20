import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './CustomButton';

interface CameraHandlerProps {
  onImageCaptured: (uri: string) => void;
}

export default function CameraHandler({ onImageCaptured }: CameraHandlerProps) {
  const [permission, requestPermission] = useCameraPermissions();

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImageCaptured(result.assets[0].uri);
    }
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        {/* <Text>We need your permission to show the camera</Text> */}
        <CustomButton onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomButton title="Open Camera" onPress={openCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
