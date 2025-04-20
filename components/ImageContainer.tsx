import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface Props {
  uri?: string; // optional — use only if provided
  fallback: ImageSourcePropType; // local image asset
}

export default function ImageContainer({ uri, fallback }: Props) {
  return (
    <Image
      source={uri ? { uri } : fallback}
      style={styles.image}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 400,
    borderRadius: 20,
    marginVertical: 20,
  },
});
