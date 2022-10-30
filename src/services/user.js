import { getAuth } from 'firebase/auth';
import { getDoc, getFirestore, doc, setDoc, deleteDoc } from 'firebase/firestore';

const getUserById = async (id) => {
  if (!id) {
    return null;
  }
  try {
    const db = getFirestore();
    const snapshot = await getDoc(doc(db, 'user', id));
    if (snapshot.exists) {
      return { ...snapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const getIsUserFollowing = async (userId, otherUserId) => {
  try {
    const db = getFirestore();
    const snapshot = await getDoc(doc(db, `user/${userId}/following`, otherUserId));
    return snapshot.exists();
  } catch (error) {}
};

const changeFollowingState = async ({ otherUserId, isFollowing }) => {
  try {
    const db = getFirestore();
    const userId = getAuth().currentUser?.uid;
    if (isFollowing) {
      await deleteDoc(doc(db, `user/${userId}/following`, otherUserId));
    } else {
      await setDoc(doc(db, `user/${userId}/following`, otherUserId), {});
    }
  } catch (error) {
    console.log(error);
  }
};

export { getUserById, getIsUserFollowing, changeFollowingState };
