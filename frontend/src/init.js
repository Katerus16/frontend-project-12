import { io } from 'socket.io-client';
import { actions as messagesActions } from './slices/messagesSlice.js';
import store from './slices/index.js'
import { toast } from 'react-toastify';
import { actions as channelsActions } from './slices/channelsSlice.js';



const socket = io();

export default (t) => {
  
  socket
    .on('newMessage', (payload) => {
      console.debug('newMessage "event"', payload);
      store.dispatch(messagesActions.addMessage(payload));
    })
     .on('newChannel', (payload) => {
      console.debug('newChannel "event"', payload);
      store.dispatch(channelsActions.addChannel(payload));
      toast.info(t('Channel created'));
    })
    .on('removeChannel', (payload) => {
      console.debug('removeChannel "event"', payload);
      console.log(payload);
      store.dispatch(channelsActions.deleteChannel(payload.id));
      toast.info(t('Channel removed'));
    })
    .on('renameChannel', (payload) => {
      console.debug('renameChannel "event"', payload);
      console.log(payload);
      const { id, name } = payload;
      store.dispatch(channelsActions.renameChannel({ id, changes: { name } }));
      toast.info(t('Channel renamed'));
    });

}