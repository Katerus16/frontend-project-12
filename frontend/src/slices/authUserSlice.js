/* eslint no-param-reassign: 0 */

import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import routes from '../routes.js'

export const addAuthUser = createAsyncThunk(
  'authUser/add',
  async ({ username, password }) => {
    const response = await axios.post(routes.getAuthUser(), { username, password })
    return response.data
  },
)

export const createAuthUser = createAsyncThunk(
  'authUser/create',
  async ({ username, password }) => {
    const response = await axios.post(routes.getNewAuthUser(), { username, password })
    return response.data
  },
)

const initialState = {
  error: '',
  isUserAuth: (!localStorage.getItem('token')) ? false : true,
}

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    logOutUser: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      state.isUserAuth = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAuthUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('username', action.payload.username)
        state.isUserAuth = true
      })
      .addCase(createAuthUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('username', action.payload.username)
        state.isUserAuth = true
      })
      .addCase(addAuthUser.rejected, (state, action) => {
        if (action.error.code === 'ERR_BAD_REQUEST') {
          state.error = 'Invalid username or password'
        }
        else (state.error = 'Connection error')
      })
      .addCase(createAuthUser.rejected, (state, action) => {
        if (action.error.code === 'ERR_BAD_REQUEST') {
          state.error = 'This user already exists'
        }
        else (state.error = 'Connection error')
      })
  },
})

export const { actions } = authUserSlice
export default authUserSlice.reducer
