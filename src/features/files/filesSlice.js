import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchFiles = createAsyncThunk('files/fetch', async (params = {}, { rejectWithValue }) => { try { return (await api.get('/files/search', { params })).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Could not load files'); } });
export const uploadFile = createAsyncThunk('files/upload', async ({ file, tags }, { rejectWithValue }) => { try { const fd = new FormData(); fd.append('file', file); fd.append('tags', tags); return (await api.post('/files/upload', fd)).data.file; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Upload failed'); } });
export const deleteFile = createAsyncThunk('files/delete', async (id, { rejectWithValue }) => { try { await api.delete(`/files/${id}`); return id; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Delete failed'); } });

const slice = createSlice({ name: 'files', initialState: { items: [], pagination: {}, loading: false, error: null }, reducers: {}, extraReducers: (b) => {
  b.addCase(fetchFiles.pending, s => { s.loading = true; s.error = null; }).addCase(fetchFiles.fulfilled, (s,a) => { s.loading = false; s.items = a.payload.items; s.pagination = a.payload.pagination; }).addCase(fetchFiles.rejected, (s,a) => { s.loading = false; s.error = a.payload; });
  b.addCase(uploadFile.fulfilled, (s,a) => { s.items.unshift(a.payload); }).addCase(uploadFile.rejected, (s,a) => { s.error = a.payload; });
  b.addCase(deleteFile.fulfilled, (s,a) => { s.items = s.items.filter(f => f._id !== a.payload); });
} });
export default slice.reducer;
