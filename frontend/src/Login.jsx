import React from 'react';
import { Formik, Form, Field } from 'formik';

export default () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={({ setSubmitting }) => {
        console.log("Form is validated! Submitting the form...");
        setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              className="form-control"
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};