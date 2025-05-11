import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import FormContainer from './FormContainer';


const SignupPage = () => {

  const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      // onSubmit: useSubmit(setAuthFailed, setErrorMessage),
    }); 

  return (
    <FormContainer image= 'imagereg.png' imageAlt= 'Регистрация' regfooter={false} >
      <Form className ='w-50 mx-auto' onSubmit=''>
        <h1 className="text-center mb-4">{'Регистрация'}</h1>
        <fieldset disabled=''>
          <Stack gap={3}>
            <FloatingLabel controlId="floatingUsername" label={'Имя пользователя'} className="position-relative">
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder='Имя пользователя'
                name="username"
                autoComplete="username"
                isInvalid=''
              />
              {/* {signupFailed && (
                <Form.Control.Feedback type="invalid" tooltip className="position-absolute top-0 start-100">
                  {t('This user already exists')}
                </Form.Control.Feedback>
              )}
              {formik.errors.username && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {t(formik.errors.username)}
                </Form.Control.Feedback>
              )} */}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label='Пароль'>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder='Пароль'
                name="password"
                autoComplete="current-password"
                isInvalid=''
              />
              {/* <Form.Control.Feedback type="invalid" tooltip>
                {t(formik.errors.password)}
              </Form.Control.Feedback> */}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPasswordConfirmation" label={'Подтвердите пароль'}>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
                placeholder='Подтвердите пароль'
                name="passwordConfirmation"
                autoComplete="current-passwordConfirmation"
                isInvalid=''
              />
              {/* <Form.Control.Feedback type="invalid" tooltip>
                {t(formik.errors.passwordConfirmation)}
              </Form.Control.Feedback> */}
            </FloatingLabel>
            <Button type="submit" variant="outline-primary">{'Зарегистрироваться'}</Button>
          </Stack>
        </fieldset>
      </Form>
    </FormContainer>
  );
};

export default SignupPage;