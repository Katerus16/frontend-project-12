import axios from 'axios';
import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import routes from '../routes.js';

export const addAuthUser = createAsyncThunk(
  'authUser/add',
  async ({username, password}) => {
    const response = await axios.post(routes.getAuthUser(), { username, password });
    return response.data;
  }
);

export const createAuthUser = createAsyncThunk(
  'authUser/create',
  async ({username, password}) => {
    const response = await axios.post(routes.getNewAuthUser(), { username, password });
    return response.data;
  }
);

const initialState = {
  error: '',
  redirect: false,
  showButton: false,
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    logOutUser: (state, action) => { 
      localStorage.removeItem('token');
      state.showButton = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAuthUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.username);
        state.redirect = true;
        state.showButton = true;
      })
      .addCase(createAuthUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.username);
        state.redirect = true;
        state.showButton = true;
      })
      .addCase(addAuthUser.rejected, (state, action) => {
        if (action.error.code === "ERR_BAD_REQUEST") {
          state.error = 'Invalid username or password';
        } else ( state.error = 'Connection error')
      })
      .addCase(createAuthUser.rejected, (state, action) => {
        if (action.error.name === "ERR_BAD_REQUEST") {
          state.error = 'Invalid username or password';
        } else ( state.error = 'Connection error')
      });
  },
})

export const { actions } = authUserSlice;
export default authUserSlice.reducer;