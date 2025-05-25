import routes from '../routes.js'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const setAuthHeader = (headers) => {
  headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
  return headers
}

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  tagTypes: ['Messages'],
  baseQuery: fetchBaseQuery({ baseUrl: routes.getMessages(), prepareHeaders: setAuthHeader }),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation({
      query: ({ cleanMessage, channelId, currentUsername }) => ({
        url: '',
        method: 'POST',
        body: { body: cleanMessage, channelId, username: currentUsername },
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi
