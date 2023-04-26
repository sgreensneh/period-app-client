import React from 'react';
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import * as yup from "yup";
import {ILogin} from "../../types/auth.types";
import authService from "../../services/auth.service";

function LoginPage() {
  const validationSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required")
  });

  const initialValues: ILogin = {
    password: "",
    username: ""
  }

  const onSubmit = (values: ILogin, helpers: FormikHelpers<ILogin>) => {
    authService.login(values)
      .then((res) => {
        helpers.setSubmitting(false);
      })
      .catch((err) => {
        helpers.setSubmitting(false);
        if (err?.data?.data) {
          helpers.setErrors(err.data.data)
        } else if (err?.data?.message) {
          helpers.setErrors({password: err.data.message})
        } else {
          helpers.setErrors({password: err.message})
        }
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-800">
      <div className="w-full max-w-md rounded px-5 py-8 bg-white drop-shadow-2xl">
        <h3>Login</h3>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({isSubmitting, isValid}) => (
            <Form>
              <div className="mt-5">
                <Field name="username">
                  {({field, meta}: FieldProps) => (
                    <Input
                      label="Username"
                      placeholder="Username"
                      error={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div className="mt-5">
                <Field name="password">
                  {({field, meta}: FieldProps) => (
                    <Input
                      label="Password"
                      placeholder="Password"
                      type="password"
                      error={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div className="mt-5">
                <Button disabled={isSubmitting || !isValid}>Login</Button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-8">New here? <Link to="/signup">Create new account</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
