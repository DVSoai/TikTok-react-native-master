import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const AuthItem = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.icon}>{icon}</View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AuthItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.3,
    borderRadius: 3,
    borderColor: 'gray',
    marginVertical: 5,
  },
  content: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 8,
  },
  title: {
    fontSize: 16,
  },
});
