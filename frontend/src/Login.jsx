import React, {useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import FormContainer from './FormContainer';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const useSubmit = (setAuthFailed, setErrorMessage) => {
  return ({ username, password }) => {
    setAuthFailed(false);
    axios.post('/api/v1/login', { username, password }).then((response) => {
      localStorage.setItem('token', response.data.token);
      window.location.replace('http://localhost:5001/')
      }).catch((error) => {
        if (!error.isAxiosError) throw err;
        if (error.response.status === 401) {setAuthFailed(true)
        setErrorMessage('Неверные имя пользователя или пароль')}
        else setErrorMessage('Ошибка соединения')
      });
  };
};

export default () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: useSubmit(setAuthFailed, setErrorMessage),
  });

  return (
    <FormContainer>
          <Form onSubmit={formik.handleSubmit}>
            <h1 class="text-center mb-4">Войти</h1>
            <Stack gap={4}>
            <FloatingLabel controlId="floatingUsername" label='Ваш ник' className="mb-3">
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder='Ваш ник'
                name="username"
                autoComplete="username"
                isInvalid={authFailed || (formik.touched.username && formik.errors.username)}
              />
              {authFailed && (
                <Form.Control.Feedback type="invalid" tooltip className="position-absolute top-0 start-100">
                  {errorMessage}
                </Form.Control.Feedback>
              )}
              {formik.errors.username && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.username}
                </Form.Control.Feedback>
              )}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={'Пароль'}>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder={'Пароль'}
                name="password"
                autoComplete="password"
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
            </Stack>
            <Button type="submit" variant="outline-primary" className='w-100 mb-3 btn btn-outline-primary'>Войти</Button>
          </Form>
    </FormContainer>
  );
};