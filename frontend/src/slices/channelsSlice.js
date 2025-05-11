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

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addChannel: channelsAdapter.addOne,
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
      })
      .addCase(fetchChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
})

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;