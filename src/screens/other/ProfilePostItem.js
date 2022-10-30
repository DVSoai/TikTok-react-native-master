import { Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ProfilePostItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('OtherFeedScreen', { userId: item.creator });
      }}
      style={({ pressed }) => [{ flex: 1 / 3, margin: 1 }, pressed && { opacity: 0.5 }]}>
      <Image source={{ uri: item.source.thumbnailUrl }} style={{ aspectRatio: 9 / 16 }} />
    </Pressable>
  );
};

export default ProfilePostItem;
