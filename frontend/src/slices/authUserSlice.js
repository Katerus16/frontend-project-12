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

const initialState = {
  error: '',
  redirect: false,
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAuthUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.username);
        state.redirect = true;
      })
      .addCase(addAuthUser.rejected, (state, action) => {
        if (action.error.name === 'AxiosError') {
          state.error = 'Неверные имя пользователя или пароль';
        } else ( state.error = 'Ошибка соединения')
      });
  },
})

export const { actions } = authUserSlice;
export default authUserSlice.reducer;