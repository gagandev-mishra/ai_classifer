import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function HeaderText({ title }: { title: string }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#b9fbc0',
    marginBottom: 20,
    textAlign: 'center',
  },
});
