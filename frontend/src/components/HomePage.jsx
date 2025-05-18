import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannel, selectors, selectCurrentChannel } from '../slices/channelsSlice.js'
import ChannelsList from './ChannelsList.jsx';
import Chat from './Chat.jsx';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/Row';
import { setMessage } from '../slices/messagesSlice.js';
import getModal from './modals/index.js';
import {useNavigate} from "react-router-dom";

const renderModal = ({ modalInfo, hideModal, channels }) => {
  if (!modalInfo.type) return null;
  const ModalComponent = getModal(modalInfo.type);
  return (
    <ModalComponent
      modalInfo={modalInfo}
      onHide={hideModal}
      channels={channels}
    />
  );
};

export default () => {
  const navigate = useNavigate();
  if(!localStorage.getItem('token')) {
    navigate("/login");
  }
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const currentChannel = useSelector(selectCurrentChannel);

  useEffect(() => {
    dispatch(fetchChannel());
    dispatch(setMessage());
  }, [])

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  

  return (
    <Container className='h-100 my-4 overflow-hidden rounded shadow'>
      <Row className='h-100 bg-white flex-md-row'>
        <ChannelsList currentChannel={currentChannel} channels={channels} showModal={showModal} />
        { currentChannel && (<Chat currentChannel={currentChannel} />) }
      </Row>
      {renderModal({ modalInfo, hideModal, channels})}
    </Container>
  );
};