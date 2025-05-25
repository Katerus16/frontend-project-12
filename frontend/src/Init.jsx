import { io } from 'socket.io-client'
import reducer from './slices/index.js'
import i18nextru from './i18next.js'
import { I18nextProvider } from 'react-i18next'
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react'
import App from './components/App.jsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { messagesApi } from './slices/messagesSlice.js'
import { channelsApi, actions } from './slices/channelsSlice.js'
import log from './logger.js'

export const store = configureStore(reducer)
const Init = async () => {
  const socket = io()
  socket
    .on('newMessage', (payload) => {
      log('newMessage "event"', payload)
      store.dispatch(messagesApi.util.invalidateTags(['Messages']))
    })
    .on('newChannel', (payload) => {
      log('newChannel "event"', payload)
      store.dispatch(channelsApi.util.invalidateTags(['Channels']))
    })
    .on('removeChannel', (payload) => {
      log('removeChannel "event"', payload)
      store.dispatch(channelsApi.util.invalidateTags(['Channels']))
      store.dispatch(actions.setCurrentChannelId('1'))
    })
    .on('renameChannel', (payload) => {
      log('renameChannel "event"', payload)
      store.dispatch(channelsApi.util.invalidateTags(['Channels']))
    })
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  }
  const i18n = await i18nextru()
  return (
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <App socket={socket} />
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  )
}

export default Init
