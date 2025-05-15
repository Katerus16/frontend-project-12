import React, { useEffect, useRef } from 'react';
import {useFormik} from 'formik';
import FormContainer from './FormContainer';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addAuthUser } from '../slices/authUserSlice';
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const authError = useSelector(state => state.authUser.error)
  const redirectToHomePage  = useSelector(state => state.authUser.redirect)
  if(redirectToHomePage) {
    navigate("/");
  }
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if(!!authError) {
      toast.error(t(authError));
    }
  }, [authError]);
  const validationSchema = Yup.object().shape({
    username: Yup.string().trim()
      .min(3, 'From 3 to 20 characters')
      .max(20, 'From 3 to 20 characters')
      .required('Required field'),
    password: Yup.string().trim()
      .required('Required field'),
  });
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
    validationSchema,
    onSubmit: useSubmit(),
  });

  return (
    <FormContainer image= 'imagelogin.png' imageAlt= {t('Login')} regfooter={true}>
          <Form onSubmit={formik.handleSubmit}>
            <h1 class="text-center mb-4">{t('Login')}</h1>
            <Stack gap={3}>
            <FloatingLabel controlId="floatingUsername" label={t('Your nickname')} className="position-relative">
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder={t('Your nickname')}
                name="username"
                autoComplete="username"
                isInvalid={!!(authError) || (formik.touched.username && formik.errors.username)}
                ref={inputRef}
              />
              {!!(authError) && (
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              )}
              {formik.errors.username && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {t(formik.errors.username)}
                </Form.Control.Feedback>
              )}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={t('Password')} className="mb-4" >
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder={t('Password')}
                name="password"
                autoComplete="password"
                isInvalid={!!(authError) || formik.touched.password && formik.errors.password}
              />
                {!!(authError) && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {t(authError)}
                </Form.Control.Feedback>
              )}
              <Form.Control.Feedback type="invalid" tooltip>
                {t(formik.errors.password)}
              </Form.Control.Feedback>
            </FloatingLabel>
            </Stack>
            <Button type="submit" variant="outline-primary" className='w-100 mb-3 btn btn-outline-primary'>{t('Login')}</Button>
          </Form>
    </FormContainer>
  );
};