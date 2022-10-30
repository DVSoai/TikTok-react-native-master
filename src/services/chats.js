import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const chatsListener = async (listener) => {
  try {
    const db = getFirestore();
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('members', 'array-contains', getAuth().currentUser?.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() });
      });
      listener(chats);
    });
    return unsubscribe;
  } catch (error) {
    console.log('🚀 ~ file: chats.js ~ line 27 ~ error', error);
  }
};

const messagesListener = async (chatId, listener) => {
  try {
    const db = getFirestore();
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy('creation', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const massages = [];
      querySnapshot.forEach((doc) => {
        massages.push({ id: doc.id, ...doc.data() });
      });
      listener(massages);
    });
    return unsubscribe;
  } catch (error) {
    console.log('🚀 ~ file: chats.js ~ line 45 ~ error', error);
  }
};

const sendMessage = async (chatId, message) => {
  try {
    const db = getFirestore();
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const creation = new Date().toJSON();
    await addDoc(messagesRef, {
      creator: getAuth().currentUser?.uid,
      creation,
      message,
    });
    await updateDoc(doc(db, 'chats', chatId), {
      lastUpdate: creation,
      lastMessage: message,
    });
  } catch (error) {
    console.log('🚀 ~ file: chats.js ~ line 59 ~ error', error);
  }
};

const createChat = async (contactId) => {
  try {
    const db = getFirestore();
    const chatsRef = collection(db, 'chats');
    const response = await addDoc(chatsRef, {
      lastUpdate: new Date().toJSON(),
      lastMessage: 'Hãy gửi tin nhắn đầu tiên!',
      members: [getAuth().currentUser?.uid, contactId],
    });
    return response.id;
  } catch (error) {
    console.log('🚀 ~ file: chats.js ~ line 74 ~ error', error);
  }
};

export { chatsListener, messagesListener, sendMessage, createChat };
