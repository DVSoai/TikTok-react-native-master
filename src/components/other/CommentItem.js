import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useUser } from '../../hooks/useUser';
import Avatar from './Avatar';

const CommentItem = ({ data }) => {
  const user = useUser(data.creator);

  return (
    <View style={styles.container}>
      <Avatar size={40} uri={user?.data?.photoURL} />
      <View style={styles.infoContainer}>
        <Text style={styles.displayName}>{user?.data?.displayName}</Text>
        <Text style={styles.comment}>{data.comment}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContainer: {
    marginLeft: 10,
  },
  displayName: {
    color: 'gray',
  },
});
