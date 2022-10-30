import {
  collection,
  doc,
  getDoc,
  getFirestore,
  orderBy,
  setDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

const postsListener = async (callback) => {
  try {
    const db = getFirestore();
    const q = query(collection(db, 'post'), orderBy('creation', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      callback(posts);
    });
    return unsubscribe;
  } catch (error) {
    console.log(error);
  }
};

const postsListenerByUserId = async (id, callback) => {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, 'post'),
      where('creator', '==', id),
      orderBy('creation', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const post = {
            id: doc.id,
            ...doc.data(),
          };
          posts.push(post);
        }
      });
      callback(posts);
    });
    return unsubscribe;
  } catch (error) {
    console.log(error);
  }
};

const isUserLikePost = async (userId, postId) => {
  try {
    const db = getFirestore();
    const result = await getDoc(doc(db, `post/${postId}/likes`, userId));
    return result.exists();
  } catch (error) {
    console.log(error);
  }
};

const updateUserLikePost = async (userId, postId, likeState) => {
  try {
    const db = getFirestore();
    if (likeState) {
      await deleteDoc(doc(db, `post/${postId}/likes`, userId));
    } else {
      await setDoc(doc(db, `post/${postId}/likes`, userId), {});
    }
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (postId, userId, comment) => {
  try {
    const db = getFirestore();
    await addDoc(collection(db, `post/${postId}/comments`), {
      comment,
      creator: userId,
      creation: new Date().toJSON(),
    });
  } catch (error) {
    console.log(error);
  }
};

const commentsListener = async (postId, callback) => {
  try {
    const db = getFirestore();
    const q = query(collection(db, `post/${postId}/comments`), orderBy('creation', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
      });
      callback(comments);
    });
    return unsubscribe;
  } catch (error) {
    console.log(error);
  }
};

export {
  postsListener,
  isUserLikePost,
  updateUserLikePost,
  addComment,
  commentsListener,
  postsListenerByUserId,
};
