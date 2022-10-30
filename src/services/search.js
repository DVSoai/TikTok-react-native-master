import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const queryUsersByName = async (name) => {
  if (name.trim() === '') {
    return [];
  }
  try {
    const db = getFirestore();
    const q = query(
      collection(db, 'user'),
      where('displayName', '>=', name),
      where('displayName', '<=', '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users.filter((user) => user.displayName.includes(name));
  } catch (error) {
    console.log(error);
  }
};

export { queryUsersByName };
