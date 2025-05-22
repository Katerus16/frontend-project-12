import { io } from 'socket.io-client'
import { toast } from 'react-toastify'
import { actions as messagesActions } from './slices/messagesSlice.js'
import { channelsApi } from './slices/channelsSlice.js'
import { messagesApi } from './slices/messagesSlice.js'
import reducer from './slices/index.js'
import i18nextru from './i18next.js'
import { I18nextProvider } from 'react-i18next'
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react'
import App from './components/App.jsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore(reducer)
export default async (t) => {
  const socket = io()
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
