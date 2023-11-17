import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage } from '../pages/auth';
import ApiDocPageWrapper from '../pages/docs/forms/ApiDocPageWrapper';
import { Login } from '../pages/auth/components/Login';
import { Registration } from '../pages/auth/components/Registration';
import { ForgotPassword } from '../pages/auth/components/ForgotPassword';


export function PublicRoutes() {

  return (
    <Routes>
      <Route path='/docs/api' element={<ApiDocPageWrapper />} />
      <Route path='/docs/formik' element={<ApiDocPageWrapper />} />
      <Route path='/auth' element={<AuthPage />} >
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route index element={<Navigate to='/auth/login' />} />
      </Route>
      {/*<Route path='*' element={<Navigate to='/auth' />} />*/}
      <Route path='/*' element={<Navigate to='/auth' />}/>
    </Routes>
  );
}
