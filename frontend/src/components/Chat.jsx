import React from 'react';
import Col from 'react-bootstrap/Col';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, selectors } from '../slices/messagesSlice';
import { useTranslation } from 'react-i18next';
import profanityFilter from 'leo-profanity';



export default ({ currentChannel }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  });
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const currentUsername = localStorage.getItem('username');
  const isSubbmiting = false;
  const channelId = currentChannel.id
  const dispatch = useDispatch();
  const messages = useSelector(selectors.selectAll);
  console.log(messages);
  const currentChannelMessages = messages.filter((message) => message.channelId === channelId);
  console.log(currentChannelMessages)
  return (
    <Col className="p-0 h-100">
      <div className='d-flex flex-column h-100'>
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${currentChannel.name}`}</b></p>
          <span className="text-muted">{t('messagesCount', { count: currentChannelMessages.length })}</span>
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
            const cleanMessage = profanityFilter.clean(message);
            console.log(cleanMessage)
            dispatch(sendMessage({cleanMessage, channelId, currentUsername}));
          }}>
          <fieldset disabled={isSubbmiting}>
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label={t('A new message')}
                placeholder={t('Enter your message...')}
                className="border-0 p-0 ps-2 form-control"
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}
                ref={inputRef}
              />
              <button type="submit" disabled="" className="btn btn-group-vertical">
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">{t('Send')}</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    </Col>
  );
};
