import './App.css'
import HomePage from './HomePage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import NotFound from './NotFound.jsx'
import Signup from './Signup.jsx'
import Header from './Header.jsx'
import { ToastContainer, toast } from 'react-toastify'
import PrivateRoute from './PrivateRoute.jsx'
import { useDispatch } from 'react-redux'
import { messagesApi } from '../slices/messagesSlice.js'
import { channelsApi, actions } from '../slices/channelsSlice.js'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function App({ socket }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  useEffect(() => {
    socket
      .on('newMessage', (payload) => {
        console.debug('newMessage "event"', payload)
        dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (messages) => {
          messages.push(payload)
        }))
      })
      .on('newChannel', (payload) => {
        console.debug('newChannel "event"', payload)
        dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
          channels.push(payload)
        }))
        toast.info(t('Channel created'))
      })
      .on('removeChannel', (payload) => {
        console.debug('removeChannel "event"', payload)
        dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
          const index = channels.findIndex(({ id }) => id === payload.id)
          if (index > -1) {
            channels.splice(index, 1)
          }
        }))
        dispatch(actions.setCurrentChannelId('1'))
        toast.info(t('Channel removed'))
      })
      .on('renameChannel', (payload) => {
        console.debug('renameChannel "event"', payload)
        dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
          const index = channels.findIndex(({ id }) => id === payload.id)
          if (index > -1) {
            channels.splice(index, 1, payload)
          }
        }))
        toast.info(t('Channel renamed'))
      })
  }, [])

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer pauseOnFocusLoss={false} position="top-right" />
      </div>
    </BrowserRouter>
  )
}

export default App
