import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Get users from localStorage
const getStoredUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const storeUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

// Get auth user from localStorage
const getStoredAuthUser = () => JSON.parse(localStorage.getItem('authUser')) || null;

export const signUp = createAsyncThunk('auth/signUp', async ({ name, email, password }) => {
  const users = getStoredUsers();
  const exists = users.find(user => user.email === email);
  if (exists) throw new Error('Email already exists');
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  storeUsers(users);
  localStorage.setItem('authUser', JSON.stringify(newUser));
  return newUser;
});

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }) => {
  const users = getStoredUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  localStorage.setItem('authUser', JSON.stringify(user));
  return user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getStoredAuthUser(),
    isAuthenticated: !!getStoredAuthUser(),
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authUser');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
