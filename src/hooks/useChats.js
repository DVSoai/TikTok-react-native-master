import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatsListener } from '../services/chats';
import { setChats } from '../redux/slice/chatSlice';

const useChats = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handlerChatsChange = useCallback(
    (chats) => {
      dispatch(setChats(chats));
    },
    [dispatch]
  );

  useEffect(() => {
    let listenerCondition;
    (async () => {
      if (currentUser) {
        listenerCondition = await chatsListener(handlerChatsChange);
      }
    })();
    return () => {
      listenerCondition && listenerCondition();
    };
  }, [currentUser, handlerChatsChange]);
};

export { useChats };
