/* eslint no-param-reassign: 0 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
import routes from '../routes.js'

const setAuthHeader = (headers) => {
  headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
  return headers
}

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: routes.getChannels(), prepareHeaders: setAuthHeader }),
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: name => ({
        url: '',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
    }),
    deleteChannel: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
})

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: { currentChannelId: '1' },
  reducers: {
    setCurrentChannelId: (state, action) => { state.currentChannelId = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(channelsApi.endpoints.deleteChannel.matchFulfilled, (state, { payload }) => {
        if (payload.id === state.currentChannelId) {
          state.currentChannelId = '1'
        }
      })
      .addMatcher(channelsApi.endpoints.addChannel.matchFulfilled, (state, { payload }) => {
        state.currentChannelId = payload.id
      })
  },
})

export const { actions } = channelsSlice
export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useDeleteChannelMutation,
  useRenameChannelMutation,
} = channelsApi
