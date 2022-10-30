import { StyleSheet } from 'react-native';
import React from 'react';
import { Avatar as AvatarPaper } from 'react-native-paper';

const Avatar = ({ uri, size }) => {
  return uri ? (
    <AvatarPaper.Image
      source={{
        uri: uri,
      }}
      size={size}
    />
  ) : (
    <AvatarPaper.Icon icon='account' size={size} />
  );
};

export default Avatar;

const styles = StyleSheet.create({});
