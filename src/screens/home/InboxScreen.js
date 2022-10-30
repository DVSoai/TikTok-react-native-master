import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ChatListItem from '../../components/chats/ChatListItem';
import { useSelector } from 'react-redux';

const InboxScreen = () => {
  const chatList = useSelector((state) => state.chat.list);

  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews
        data={chatList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatListItem chat={item} />}
      />
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
