import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';
import axios from 'axios';

export const fetchChannel = createAsyncThunk(
  'channel/fetch', 
  async () => {
    const response = await axios.get(routes.getChannel(), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

export const addChannel = createAsyncThunk(
  'channel/add',
  async (name) => {
    const response = await axios.post(routes.getChannel(), { name }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

export const renameChannel = createAsyncThunk(
  'channel/rename',
  async ({ id, name }) => {
    const response = await axios.patch(routes.getChannelById(id), { name }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

export const deleteChannel = createAsyncThunk(
  'channel/delete',
  async ({ id }) => {
    const response = await axios.delete(routes.getChannelById(id),{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null, currentChannelId: '1' }),
  reducers: {
    setCurrentChannelId: (state, action) => { state.currentChannelId = action.payload },
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    deleteChannel: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        channelsAdapter.addOne(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
        state.currentChannelId = action.payload.id;
      })
      .addCase(renameChannel.fulfilled, (state, action) => {
        channelsAdapter.setOne(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(deleteChannel.fulfilled, (state, action) => {
        channelsAdapter.removeOne(state, action.payload.id);
        state.loadingStatus = 'idle';
        state.error = null;
        state.currentChannelId = '1';
      })
      .addCase(fetchChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
})

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const selectCurrentChannel = (state) => state.channels.entities[state.channels.currentChannelId];
export default channelsSlice.reducer;