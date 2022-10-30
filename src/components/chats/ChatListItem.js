import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useUser } from '../../hooks/useUser';
import { getAuth } from 'firebase/auth';
import Avatar from '../other/Avatar';
import { useNavigation } from '@react-navigation/native';

const ChatListItem = ({ chat }) => {
  const currentUserId = getAuth().currentUser?.uid;
  const { data: userData } = useUser(
    chat.members[0] === currentUserId ? chat.members[1] : chat.members[0]
  );
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatSingleScreen', {
          chatId: chat.id,
          contactName: userData?.displayName,
        })
      }
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.5 }]}>
      <Avatar size={50} uri={userData?.photoURL} />
      <View style={styles.contentContainer}>
        <Text style={styles.displayName}>{userData?.displayName}</Text>
        <View style={styles.info}>
          <Text style={styles.chatMessage}>
            {chat.lastMessage.length >= 20
              ? chat.lastMessage.slice(0, 17) + '...'
              : chat.lastMessage}
          </Text>
          <Text style={styles.time}>{chat.lastUpdate.slice(0, 10)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#E4DCCF',
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  displayName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessage: {
    fontSize: 16,
  },
  time: {
    color: 'gray',
    marginRight: 5,
    fontSize: 12,
  },
});
