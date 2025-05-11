import React from 'react';
import {useFormik} from 'formik';
import FormContainer from './FormContainer';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addAuthUser } from '../slices/authUserSlice';
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom";


export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector(state => state.authUser.error)
  const redirectToHomePage  = useSelector(state => state.authUser.redirect)
  if(redirectToHomePage) {
    navigate("/");
  }

  const useSubmit = () => { 
    return ({ username, password }) => {
      dispatch(addAuthUser({username, password}));
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: useSubmit(),
  });

  return (
    <FormContainer image= 'imagelogin.png' imageAlt= 'Войти' regfooter={true}>
          <Form onSubmit={formik.handleSubmit}>
            <h1 class="text-center mb-4">Войти</h1>
            <Stack gap={3}>
            <FloatingLabel controlId="floatingUsername" label='Ваш ник' className="position-relative">
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder='Ваш ник'
                name="username"
                autoComplete="username"
                isInvalid={!!(authError) || (formik.touched.username && formik.errors.username)}
              />
              {!!(authError) && (
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              )}
              {formik.errors.username && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.username}
                </Form.Control.Feedback>
              )}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={'Пароль'} className="mb-4" >
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder={'Пароль'}
                name="password"
                autoComplete="password"
                isInvalid={!!(authError) || formik.touched.password && formik.errors.password}
              />
                {!!(authError) && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {authError}
                </Form.Control.Feedback>
              )}
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