import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
    color: 'gray',
  },
});
