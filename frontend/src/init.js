import { io } from 'socket.io-client';
import { actions as messagesActions } from './slices/messagesSlice.js';
import store from './slices/index.js'

const socket = io();

export default () => {
  socket
    .on('newMessage', (payload) => {
      console.debug('newMessage "event"', payload);
      store.dispatch(messagesActions.addMessage(payload));
    })

}