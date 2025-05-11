import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import authUserReduser from './authUserSlice.js';
import messagesReduser from './messagesSlice.js';
  
  export default configureStore({
    reducer: {
      channels: channelsReducer,
      authUser: authUserReduser,
      messages: messagesReduser,
    },
  });