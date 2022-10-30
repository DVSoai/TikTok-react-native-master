import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

const LoadingOverlay = ({ color, size }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
