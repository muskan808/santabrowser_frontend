import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/register', payload);
    if (res.data.token) localStorage.setItem('access_token', res.data.token);
    return res.data.user;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Registration failed');
  }
});

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', payload);
    if (res.data.token) localStorage.setItem('access_token', res.data.token);
    return res.data.user;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Login failed');
  }
});

export const loadMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    return (await api.get('/auth/me')).data.user;
  } catch (e) {
    return rejectWithValue(null);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await api.post('/auth/logout');
  } finally {
    localStorage.removeItem('access_token');
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, initialized: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(register.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(register.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
      .addCase(register.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
    b.addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
      .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
    b.addCase(loadMe.fulfilled, (s, a) => { s.user = a.payload; s.initialized = true; })
      .addCase(loadMe.rejected, (s) => { s.initialized = true; s.user = null; });
    b.addCase(logout.fulfilled, (s) => { s.user = null; });
  }
});

export default slice.reducer;

