import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const BasicButton = ({ title, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.5 },
        disabled && styles.disabledContainer,
      ]}>
      <Text style={[styles.title, disabled && styles.disabledText]}>{title}</Text>
    </Pressable>
  );
};

export default BasicButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 3,
    marginVertical: 20,
  },
  title: {
    color: 'white',
    fontWeight: '900',
  },
  disabledContainer: {
    backgroundColor: '#e0e0e0',
  },
  disabledText: {
    color: 'gray',
  },
});
