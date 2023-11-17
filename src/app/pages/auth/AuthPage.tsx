/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Registration } from './components/Registration';
import { ForgotPassword } from './components/ForgotPassword';
import { Login } from './components/Login';
import { toAbsoluteUrl } from '../../../_metronic/helpers';
import { Logo } from '../../../_custom/components/Logo';
import { setLanguage, useLang } from '../../../_metronic/i18n/Metronici18n';
import clsx from 'clsx';
import { languages } from '../../../_metronic/partials/layout/header-menus/Languages';


export function AuthPage() {
  const lang = useLang();
  const currentLanguage = languages.find((x) => x.lang === lang);

  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='src/app/pages/auth/AuthPage#' className='mb-12'>
          <Logo className='w-300px' />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          {languages
            .filter(l=>l.lang !== lang)
            .map((l) => (
            <div
              className='menu-item px-3'
              key={l.lang}
              onClick={() => {
                setLanguage(l.lang)
              }}
            >
              <a
                href='src/app/pages/auth/AuthPage#'
                className={clsx('menu-link d-flex px-5', {active: l.lang === currentLanguage?.lang})}
              >
              <span className='symbol symbol-20px me-4'>
                <img className='rounded-1' src={l.flag} alt='gmao' />
              </span>
                {l.name}
              </a>
            </div>
          ))}
          {/*<a href='#' className='text-muted text-hover-primary px-2'>*/}
          {/*  About*/}
          {/*</a>*/}

        </div>
      </div>
      {/* end::Footer */}
    </div>
  )
}
