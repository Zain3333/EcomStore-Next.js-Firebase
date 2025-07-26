import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Do not import firebase/auth at the top level to avoid SSR chunk errors
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '../firebaseConfig';


export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  if (typeof window === 'undefined') return null;
  const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
  const auth = getAuth(app);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null;
});

export const register = createAsyncThunk('auth/register', async ({ email, password, name }: { email: string; password: string; name: string }) => {
  if (typeof window === 'undefined') return null;
  const { getAuth, createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
  const auth = getAuth(app);
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  // Set displayName
  await updateProfile(user, { displayName: name });
  // Add user data to Firestore
  const db = getFirestore(app);
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: name,
    createdAt: new Date().toISOString(),
  });
  return user ? { uid: user.uid, email: user.email, displayName: name } : null;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  if (typeof window === 'undefined') return;
  const { getAuth, signOut } = await import('firebase/auth');
  const auth = getAuth(app);
  await signOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as any,
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const user = action.payload;
        state.user = user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })
      .addCase(register.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const user = action.payload;
        state.user = user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default authSlice.reducer;
