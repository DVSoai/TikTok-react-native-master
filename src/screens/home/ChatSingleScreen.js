import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../components/button/IconButton';
import MessageItem from '../../components/chats/MessageItem';
import { useMessages } from '../../hooks/useMessages';
import { sendMessage } from '../../services/chats';

const ChatSingleScreen = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const { chatId, contactId, contactName } = route.params;
  const { messages, chatIdInst } = useMessages(chatId, contactId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: contactName,
      headerTitleAlign: 'center',
    });
  }, [contactName]);

  const handlerMessageSend = async () => {
    if (message.trim() !== '') {
      setMessage('');
      await sendMessage(chatIdInst, message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageItem data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          selectionColor='red'
          value={message}
          onChangeText={(value) => setMessage(value)}
          placeholder='Nhập tin nhắn...'
        />
        <IconButton icon='arrow-up-circle' size={40} color='red' onPress={handlerMessageSend} />
      </View>
    </View>
  );
};

export default ChatSingleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5EB',
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
  messageContainer: {
    flex: 1,
  },
  inputContainer: {
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
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
