import { channelsSlice, channelsApi } from './channelsSlice.js'
import authUserReduser from './authUserSlice.js'
import { messagesApi } from './messagesSlice.js'

export default {
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    channels: channelsSlice.reducer,
    authUser: authUserReduser,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
}
