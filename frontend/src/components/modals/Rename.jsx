import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { renameChannel } from '../../slices/channelsSlice.js';

const getValidationSchema = (channelNames) => Yup.object().shape({
  channelName: Yup.string().trim()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле')
    .notOneOf(channelNames, 'Должно быть уникальным'),
});

const Rename = ({ modalInfo: { item: channel }, onHide, channels }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const channelNames = channels.map(({ name }) => name);
  const formik = useFormik({
    initialValues: { channelName: channel.name },
    validationSchema: getValidationSchema(channelNames),
    onSubmit:  (values) => { 
      const id = channel.id;
      const name = values.channelName
      console.log(name)
      dispatch(renameChannel({ id, name }));
      onHide();
    },
  });

  return (
    <Modal show centered onHide={onHide} keyboard>
      <Modal.Header closeButton>
        <Modal.Title>{'Переименование канала'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Stack gap={2}>
              <Form.Group controlId="formChannelName" className="position-relative">
                <Form.Label visuallyHidden>{'Название канала'}</Form.Label>
                <Form.Control
                  ref={inputRef}
                  onChange={formik.handleChange}
                  value={formik.values.channelName}
                  data-testid="input-channelName"
                  name="channelName"
                  isInvalid={formik.touched.channelName && formik.errors.channelName}
                />
                <Form.Control.Feedback type="invalid" tooltip className="position-absolute">
                  {formik.errors.channelName}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button onClick={onHide} variant="secondary" className="me-2">{'Отменить'}</Button>
                <Button type="submit" variant="primary">{'Отправить'}</Button>
              </div>
            </Stack>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;