import React from 'react';
import { PlusSquareFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default ({channels, currentChannel, setCurrentChannel}) => {
  console.log(channels)
  console.log(currentChannel)
  return (
    <Col md={2} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{'Каналы'}</b>
        <button onClick={() => {}} type="button" className="p-0 text-primary btn btn-group-vertical">
          <PlusSquareFill size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
              <Button
                className="w-100 rounded-0 text-start btn"
                variant={(channel.id === currentChannel.id) && 'secondary'}
                onClick={() => {setCurrentChannel(channel)}}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
          </li>
        ))}
      </ul>
    </Col>
  );
};