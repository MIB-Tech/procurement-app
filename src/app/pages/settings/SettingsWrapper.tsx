import React, {FC, useEffect, useState} from 'react'
import {usePageData} from '../../../_metronic/layout/core'
import {Trans, useTrans} from '../../../_custom/components/Trans'
import {Form, Formik} from 'formik'
import {useAuth} from '../../../_custom/hooks/UseAuth'
import axios, {AxiosError, AxiosResponse} from 'axios'
import {GoBackButton} from '../../../_custom/components/Button/GoBackButton'
import {Button} from '../../../_custom/components/Button'
import {PasswordField} from '../../../_custom/Column/String/PasswordField'
import * as Yup from 'yup'
import {useToastr} from '../../../_custom/Toastr/UseToastr'
import {useNavigate} from 'react-router-dom'
import {useMutation} from 'react-query'
import {UserModel} from '../../modules/User'

const initialValues = {
  currentPassword: '',
  plainPassword: '',
  passwordConfirm: '',
}

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Required'),
  plainPassword: Yup.string().required('Required'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('plainPassword'), null],
    'VALIDATION.STRING.PASSWORD_CONFIRM'
  ),
})

export const SettingsWrapper: FC = () => {
  const {user} = useAuth()

  const toastr = useToastr()
  const navigate = useNavigate()

  const {setPageTitle} = usePageData()
  const {trans} = useTrans()

  const mutation = useMutation<AxiosResponse<any>, AxiosError<string>, UserModel>((data) =>
    axios.put(`/users/${user.uid}/password`, data)
  )

  // handle form success
  useEffect(() => {
    if (mutation.isSuccess) {
      toastr.updateMutationSuccess()
      navigate('/')
    }
  }, [mutation.isSuccess, navigate, toastr])

  // handle form error and validation errors

  useEffect(() => {
    setPageTitle(trans({id: 'SETTINGS'}))
  }, [setPageTitle, trans])
  return (
    <>
      <Formik
        initialValues={initialValues as UserModel}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          mutation.mutate(values)
        }}
      >
        {({touched}) => (
          <Form>
            <div className='mb-3'>
              <div className='text-end'>
                <GoBackButton size='sm' className='me-2'>
                  <Trans id='CANCEL' />
                </GoBackButton>
                <Button
                  variant='primary'
                  size='sm'
                  type='submit'
                  loading={mutation.isLoading}
                  loadingLabel={mutation.isLoading ? 'LOADING' : undefined}
                  // disabled={submittable && !submittable({formik, isGranted})}
                >
                  <Trans id='SAVE' />
                </Button>
              </div>
            </div>
            <div className='card card-bordered'>
              <div className='card-body'>
                <div>
                  <div className='fw-bold'>
                    <Trans id='OLD_PASSWORD' />
                  </div>
                  <PasswordField name='currentPassword' />
                </div>
                <div>
                  <div className='fw-bold'>
                    <Trans id='NEW_PASSWORD' />
                  </div>
                  <PasswordField name='plainPassword' />
                </div>
                <div>
                  <div className='fw-bold'>
                    <Trans id='PASSWORD_CONFIRM' />
                  </div>
                  <PasswordField name='passwordConfirm' />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {/* <UpdateView modelName={ModelEnum.User} /> */}
    </>
  )
}
