import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'throttle-debounce';
import { Ionicons } from '@expo/vector-icons';
import { isUserLikePost, updateUserLikePost } from '../../services/posts';
import { modalOpenCommentSection } from '../../redux/slice/modalSlice';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../other/Avatar';
import useAsync from '../../hooks/useAsync';

const PostOverlay = ({ user, post }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [currentLike, setCurrentLike] = useState({ state: false, counter: post.likesCount });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useAsync(
    () => isUserLikePost(currentUser?.uid, post.id),
    (like) => setCurrentLike((pre) => ({ ...pre, state: like }))
  );

  const handlerUpdateLike = useMemo(() => {
    return throttle(
      500,
      async (currentLikeState) => {
        setCurrentLike((pre) => ({
          state: !pre.state,
          counter: pre.state ? pre.counter - 1 : pre.counter + 1,
        }));
        await updateUserLikePost(currentUser?.uid, post.id, currentLikeState);
      },
      { noTrailing: true }
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.displayName}>{user?.displayName}</Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>
      <View style={styles.sidebarContainer}>
        <Pressable
          onPress={() => navigation.navigate('UserProfile')}
          style={styles.avatarContainer}>
          <Avatar size={50} uri={user?.photoURL} />
        </Pressable>
        <View style={styles.actionContainer}>
          <Pressable
            onPress={() => handlerUpdateLike(currentLike.state)}
            style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.5 }]}>
            <Ionicons name='heart' size={40} color={currentLike.state ? '#D82148' : 'white'} />
            <Text style={styles.actionText}>{currentLike.counter}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(modalOpenCommentSection({ open: true, data: post }));
            }}
            style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.5 }]}>
            <Ionicons name='chatbubble-ellipses' size={40} color='white' />
            <Text style={styles.actionText}>{post.commentsCount}</Text>
          </Pressable>
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.5 }]}>
            <Ionicons name='bookmark' size={40} color='white' />
            <Text style={styles.actionText}></Text>
          </Pressable>
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.5 }]}>
            <Ionicons name='arrow-redo' size={40} color='white' />
            <Text style={styles.actionText}></Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PostOverlay;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoContainer: {
    flex: 1,
  },
  displayName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'white',
  },
  sidebarContainer: {
    alignItems: 'center',
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 99,
  },
  actionContainer: {
    marginBottom: 50,
    marginTop: 10,
  },
  actionButton: {
    marginTop: 10,
  },
  actionText: {
    color: 'white',
    textAlign: 'center',
  },
});
