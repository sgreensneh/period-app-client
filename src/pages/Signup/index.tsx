import React from 'react';
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import {ISignup} from "../../types/auth.types";
import authService from "../../services/auth.service";

function SignupPage() {
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Required"),
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
    cycleLength: yup.number()
      .typeError("Invalid number")
      .min(18, "Cannot be less than 18")
      .max(40, "Cannot be more than 40")
      .required("Required"),
    firstFlow: yup.date().required("Required"),
  });

  const initialValues: ISignup = {
    cycleLength: 0,
    firstFlow: new Date(),
    fullName: "",
    password: "",
    username: ""
  }

  const onSubmit = (values: ISignup, helpers: FormikHelpers<ISignup>) => {
    authService.signup(values)
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
        <h3>Create Account</h3>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({isSubmitting, isValid}) => (
            <Form>
              <div className="mt-5">
                <Field name="fullName">
                  {({field, meta}: FieldProps) => (
                    <Input
                      label="Full name"
                      placeholder="Full name"
                      error={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </div>

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

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="">
                  <Field name="cycleLength">
                    {({field, meta}: FieldProps) => (
                      <Input
                        label="Cycle length"
                        placeholder="Cycle length"
                        error={meta.touched && meta.error ? meta.error : ""}
                        {...field}
                      />
                    )}
                  </Field>
                </div>
                <div className="">
                  <Field name="firstFlow">
                    {({field, meta}: FieldProps) => (
                      <Input
                        label="Last Flow"
                        placeholder="Last Flow"
                        type="date"
                        error={meta.touched && meta.error ? meta.error : ""}
                        {...field}
                      />
                    )}
                  </Field>
                </div>
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
                <Button disabled={isSubmitting || !isValid}>Signup</Button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="mt-8">Already have account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default SignupPage;
