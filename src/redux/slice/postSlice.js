import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import {
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'uuid-random';

const initialState = {
  requestRunning: false,
  currentUserPosts: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changeRequestRunning: (state, action) => {
      state.requestRunning = action.payload;
    },
    currentUserPostUpdate: (state, action) => {
      state.currentUserPosts = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(createPost.fulfilled, (state, action) => {});
  },
});

export const createPost = createAsyncThunk(
  'post/createPost',
  async ({ media, description, thumbnail }, { dispatch }) => {
    dispatch(changeRequestRunning(true));
    try {
      const randomId = uuid();
      const storage = getStorage();

      const mediaRef = ref(storage, `post/${getAuth().currentUser?.uid}/${randomId}/video`);
      const responseMedia = await fetch(media);
      const blobMedia = await responseMedia.blob();
      const taskMedia = await uploadBytes(mediaRef, blobMedia);
      const mediaUrl = await getDownloadURL(taskMedia.ref);

      const thumbnailRef = ref(storage, `post/${getAuth().currentUser?.uid}/${randomId}/thumbnail`);
      const responseThumbnail = await fetch(thumbnail);
      const blobThumbnail = await responseThumbnail.blob();
      const taskThumbnail = await uploadBytes(thumbnailRef, blobThumbnail);
      const thumbnailUrl = await getDownloadURL(taskThumbnail.ref);

      const db = getFirestore();
      await addDoc(collection(db, 'post'), {
        creator: getAuth().currentUser?.uid,
        source: { mediaUrl, thumbnailUrl },
        description,
        likesCount: 0,
        commentsCount: 0,
        creation: new Date().toJSON(),
        safe: {
          unsafe: false,
          unsafeReason: null,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(changeRequestRunning(false));
    }
  }
);

export const getPostsByUserId = createAsyncThunk(
  'post/getPostsByUserId',
  async (id = getAuth().currentUser?.uid, { dispatch }) => {
    const db = getFirestore();
    const q = query(
      collection(db, 'post'),
      where('creator', '==', id),
      orderBy('creation', 'desc')
    );
    onSnapshot(q, (querySnapshot) => {
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
      dispatch(currentUserPostUpdate(posts));
    });
  }
);

export const { changeRequestRunning, currentUserPostUpdate } = postSlice.actions;

export default postSlice.reducer;
