import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../slices/channelsSlice.js';

const Remove = ({ modalInfo: { item: channel }, onHide }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
      dispatch(deleteChannel({ id: channel.id }));
      onHide();
  };


  return (
    <Modal show centered onHide={onHide} keyboard>
      <Modal.Header closeButton>
        <Modal.Title>{'Удаление канала'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{'Вы уверены?'}</p>
        <Form onSubmit={onSubmit}>
          <fieldset disabled={isSubmitting}>
            <div className="d-flex justify-content-end">
              <Button onClick={onHide} variant="secondary" className="me-2">{'Отменить'}</Button>
              <Button type="submit" variant="danger">{'Удалить'}</Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
