import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const TextIconButton = ({ title, icon, onPress, primary }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.5 },
        primary && styles.primary,
      ]}>
      <Ionicons name={icon} size={24} color={primary ? 'white' : 'black'} />
      <Text style={[styles.title, primary && styles.primaryTitle]}>{title}</Text>
    </Pressable>
  );
};

export default TextIconButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    minWidth: 150,
    borderWidth: 1,
    borderColor: '#DCD7C9',
    borderRadius: 5,
  },
  primary: {
    backgroundColor: '#EB4747',
    color: 'white',
  },
  title: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  primaryTitle: {
    color: 'white',
  },
});
