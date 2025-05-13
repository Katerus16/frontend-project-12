import axios from 'axios';
import { createAsyncThunk, createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import routes from '../routes.js';

export const sendMessage = createAsyncThunk(
  'message/send',
  async ({message, channelId, currentUsername}) => {
    const response = await axios.post(routes.getMessages(), { body: message, channelId, username: currentUsername },
    {headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }});
    return response.data;
  }
);
export const setMessage = createAsyncThunk(
  'message/set',
  async () => {
    const response = await axios.get(routes.getMessages(), 
    {headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }});
    console.log(response.data)
    return response.data;
  }
);

const messagesAdapter = createEntityAdapter();

const isSubbmiting  = false;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
      builder
        .addCase(sendMessage.pending, (state) => {
          isSubbmiting  = true;
          state.loadingStatus = 'loading';
          state.error = null;
        })
        .addCase(setMessage.fulfilled, (state, action) => {
          messagesAdapter.setAll(state, action);
          state.loadingStatus = 'idle';
          state.error = null;
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
          state.loadingStatus = 'idle';
          state.error = null;
        })
        .addCase(sendMessage.rejected, (state, action) => {
          state.loadingStatus = 'failed';
          state.error = action.error;
        });
    },
})

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;