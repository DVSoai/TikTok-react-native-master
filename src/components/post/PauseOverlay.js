import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const PauseOverlay = () => {
  return (
    <View style={styles.container}>
      <Ionicons name='play' size={50} color='white' />
    </View>
  );
};

export default PauseOverlay;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 99,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
