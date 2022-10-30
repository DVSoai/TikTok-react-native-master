import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const IconButton = ({ icon, size, color, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
