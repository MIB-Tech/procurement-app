import { ToastFC } from './Toastr.types';
import { Snackbar } from '@mui/material';
import { Toast as BaseToast } from 'react-bootstrap';
import React from 'react';


export const Toastr: ToastFC = ({ variant = 'light', title, children, onDismiss }) => (
  <Snackbar
    open={true}
    autoHideDuration={6000}
    onClose={onDismiss}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <BaseToast show={true} onClose={onDismiss} bg={`light-${variant}`}>
      <BaseToast.Header>
        <strong className='me-auto'>{title}</strong>
        {/*<small>11 mins ago</small>*/}
      </BaseToast.Header>
      <BaseToast.Body>
        {children}
      </BaseToast.Body>
    </BaseToast>
  </Snackbar>
);