import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SearchUserItem = ({ user, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.container]}>
      <Text style={styles.name}>{user.displayName}</Text>
      <Image style={styles.avatar} source={{ uri: user.photoURL }} />
    </Pressable>
  );
};

export default SearchUserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    aspectRatio: 1 / 1,
  },
});
