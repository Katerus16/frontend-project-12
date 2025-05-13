import React from 'react';
import Col from 'react-bootstrap/Col';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, selectors } from '../slices/messagesSlice';
import { selectCurrentChannel } from '../slices/channelsSlice.js'

export default ({ currentChannel }) => {
  const [message, setMessage] = useState('');
  const currentUsername = localStorage.getItem('username');
  const isSubbmiting = false;
  const channelId = currentChannel.id
  const dispatch = useDispatch();
  const messages = useSelector(selectors.selectAll);
  const currentChannelMessages = messages.filter((message) => message.channelId === channelId);
  return (
    <Col className="p-0 h-100">
      <div className='d-flex flex-column h-100'>
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${currentChannel.name}`}</b></p>
          <span className="text-muted">{`${currentChannelMessages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="overflow-auto px-5 ">
        {currentChannelMessages.map(({ id, body, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            {`: ${body}`}
          </div>
        ))}
        </div>
        <div className="mt-auto px-5 py-3">
        <form noValidate="" className="py-1 border rounded-2" onSubmit={(e) => {
            e.preventDefault();
            setMessage('');
            dispatch(sendMessage({message, channelId, currentUsername}));
          }}>
          <fieldset disabled={isSubbmiting}>
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label={'Новое сообщение'}
                placeholder={'Введите сообщение...'}
                className="border-0 p-0 ps-2 form-control"
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}
                // ref={inputRef}
              />
              <button type="submit" disabled="" className="btn btn-group-vertical">
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">{'Отправить'}</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    </Col>
  );
};
