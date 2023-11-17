/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import * as auth from '../redux/AuthRedux';
import { getToken, LoginCredentials } from '../redux/AuthCRUD';
import { Trans } from '../../../../_custom/components/Trans';
import { InputField } from '../../../../_custom/Column/String/InputField';
import { Button } from '../../../../_custom/components/Button';
import { PasswordField } from '../../../../_custom/Column/String/PasswordField';
import { AxiosError } from 'axios';
import { JWTResponseMessage } from '../../../../setup/axios/SetupAxios';


const loginSchema = Yup.object().shape({
  username: Yup.string().min(3).required(),
  password: Yup.string().min(3).required()
});

const initialValues: LoginCredentials = {
  username: process.env.REACT_APP_LOGIN_USER || '',
  password: process.env.REACT_APP_LOGIN_PASSWORD || ''
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const formik = useFormik<LoginCredentials>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      getToken(values).then(({ data }) => {
        setLoading(false);
        dispatch(auth.actions.login(data));
      }).catch((error: AxiosError<{ code: string, message: JWTResponseMessage.Failure }>) => {
        const message = error.response?.data.message || JWTResponseMessage.Failure;
        setLoading(false);
        setSubmitting(false);
        setStatus(<Trans id={message} />);
      });
    },
  })

  return (
    <FormikProvider value={formik}>
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>
            <Trans id={'AUTH.LOGIN.TITLE'} />
          </h1>
        </div>
        {formik.status && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}
        <div className='fv-row mb-10'>
          <label className='form-label fs-6 fw-bolder text-dark'>
            <Trans id='USERNAME' />
          </label>
          <InputField
            size='lg'
            name='username'
            bg='solid'
            autoComplete='off'
          />
        </div>
        <div className='fv-row mb-10'>
          <div className='d-flex justify-content-between mt-n5'>
            <div className='d-flex flex-stack mb-2'>
              <label className='form-label fw-bolder text-dark fs-6 mb-0'>
                <Trans id='PASSWORD' />
              </label>
            </div>
          </div>
          <PasswordField
            size='lg'
            name='password'
            bg='solid'
            autoComplete='off'
          />
        </div>
        <div className='text-center'>
          <Button
            type='submit'
            size='lg'
            className='btn btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
            loading={loading}
          >
            <Trans id='AUTH.LOGIN.BUTTON' />
          </Button>
        </div>
      </form>
    </FormikProvider>
  )
}
