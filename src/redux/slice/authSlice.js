import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getPostsByUserId } from './postSlice';

const initialState = {
  currentUser: null,
  loaded: false,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userStateChange: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.loaded = action.payload.loaded;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(login.fulfilled, (state, action) => {})
      .addCase(register.fulfilled, (state, action) => {})
      .addCase(userAuthStateListener.fulfilled, (state, action) => {})
      .addCase(updateAvatar.fulfilled, (state, action) => {})
      .addCase(updateField.fulfilled, (state, action) => {});
  },
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, { dispatch }) => {
  dispatch(setLoading(true));
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('sign in successful');
      // ...
    })
    .catch((error) => {
      console.log('sign in unsuccessful');
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
});

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { dispatch }) => {
    dispatch(setLoading(true));
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('register successful');
      })
      .catch((error) => {
        console.log('register unsuccessful');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }
);

export const logout = createAsyncThunk('auth/signOut', async (_, { dispatch }) => {
  dispatch(setLoading(true));
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      dispatch(userStateChange(initialState));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
});

export const userAuthStateListener = createAsyncThunk(
  'auth/userAuthStateListener',
  async (_, { dispatch }) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getCurrentUserState());
        dispatch(getPostsByUserId());
      } else {
        dispatch(userStateChange({ currentUser: null, loaded: true }));
      }
    });
  }
);

const getCurrentUserState = createAsyncThunk(
  'auth/getCurrentUserState',
  async (_, { dispatch }) => {
    const auth = getAuth();
    const db = getFirestore();
    onSnapshot(doc(db, 'user', auth.currentUser?.uid), (doc) => {
      if (doc.exists()) {
        dispatch(userStateChange({ currentUser: doc.data(), loaded: true }));
      }
    });
  }
);

export const updateAvatar = createAsyncThunk('auth/updateAvatar', async (source) => {
  try {
    const storage = getStorage();
    const avatarRef = ref(storage, `avatar/${getAuth().currentUser?.uid}/avatar`);
    const response = await fetch(source);
    const blob = await response.blob();
    const task = await uploadBytes(avatarRef, blob);
    const downloadURL = await getDownloadURL(task.ref);

    const db = getFirestore();
    await updateDoc(doc(db, 'user', getAuth().currentUser?.uid), {
      photoURL: downloadURL,
    });
  } catch (error) {
    console.log(error);
  }
});

export const updateField = createAsyncThunk('auth/updateField', async ({ field, value }) => {
  try {
    const db = getFirestore();
    await updateDoc(doc(db, 'user', getAuth().currentUser?.uid), {
      [field]: value,
    });
  } catch (error) {
    console.log(error);
  }
});

export const { userStateChange, setLoading } = authSlice.actions;

export default authSlice.reducer;
