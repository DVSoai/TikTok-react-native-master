import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createChat, messagesListener } from '../services/chats';

const useMessages = (chatId, contactId) => {
  const [messages, setMessages] = useState([]);
  const [chatIdInst, setChatIdInst] = useState(chatId);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const chats = useSelector((state) => state.chat.list);

  useEffect(() => {
    (async () => {
      if (!chatIdInst) {
        const chat = chats.find((chat) => chat.members.includes(contactId));
        if (chat) {
          setChatIdInst(chat.id);
        } else {
          const id = await createChat(contactId);
          setChatIdInst(id);
        }
      }
    })();
  }, [chats]);

  useEffect(() => {
    let listenerCondition;
    (async () => {
      if (currentUser && chatIdInst) {
        listenerCondition = await messagesListener(chatIdInst, setMessages);
      }
    })();
    return () => {
      listenerCondition && listenerCondition();
    };
  }, [currentUser, chatIdInst]);

  return { messages, chatIdInst };
};

export { useMessages };
