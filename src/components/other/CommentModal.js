import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../button/IconButton';
import { addComment, commentsListener } from '../../services/posts';
import CommentItem from './CommentItem';
import { clearModal } from '../../redux/slice/modalSlice';
import Avatar from './Avatar';

const CommentModal = ({ post }) => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handlerCommentSend = () => {
    if (comment.trim() !== '') {
      addComment(post.id, currentUser?.uid, comment);
      setComment('');
    }
  };

  useEffect(() => {
    const listener = async () => {
      const unsubscribe = await commentsListener(post?.id, setCommentList);
      return unsubscribe;
    };

    const removeListener = listener();

    return () => {
      removeListener.then((removeListener) => {
        removeListener();
      });
    };
  }, [post]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.entry} />
        <Text style={styles.title}>{`${commentList.length} comments`}</Text>
        <IconButton icon='close' color='black' size={20} onPress={() => dispatch(clearModal())} />
      </View>
      <View style={styles.commentContainer}>
        <FlatList
          data={commentList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CommentItem data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.avatarContainer}>
          <Avatar size={40} uri={currentUser?.photoURL} />
        </View>
        <TextInput
          style={styles.input}
          selectionColor='red'
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
        <IconButton
          icon='arrow-up-circle'
          size={40}
          color='red'
          onPress={() => {
            console.log('comment: ' + comment);
            handlerCommentSend();
          }}
        />
      </View>
    </View>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  entry: {
    width: 20,
  },
  commentContainer: {
    flex: 1,
  },
  inputContainer: {
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});
