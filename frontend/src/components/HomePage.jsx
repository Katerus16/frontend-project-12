import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannel, addChannel, selectors } from '../slices/channelsSlice.js'
import ChannelsList from './ChannelsList.jsx';
import Chat from './Chat.jsx';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/Row';
import { setMessage } from '../slices/messagesSlice.js';


export default () => {
  if(!localStorage.getItem('token')) {
    window.location.replace('http://localhost:5001/login')
  }
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);

  useEffect(() => {
    dispatch(fetchChannel());
    dispatch(setMessage());
  }, [])

  const handleAdd = (name) => {
    dispatch(addChannel(name));
  }
  const [currentChannel, setCurrentChannel] = useState({name:'general', id: '1'});
  

  return (
    <Container className='h-100 my-4 overflow-hidden rounded shadow'>
      <Row className='h-100 bg-white flex-md-row'>
        <ChannelsList currentChannel= {currentChannel} setCurrentChannel = {setCurrentChannel} channels={channels}></ChannelsList>
        <Chat currentChannel= {currentChannel}></Chat>
      </Row>
    </Container>
  );
};