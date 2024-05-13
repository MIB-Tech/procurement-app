/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Languages } from "./Languages";
import * as auth from "../../../../app/pages/auth/redux/AuthRedux";
import { Trans } from "../../../../_custom/components/Trans";
import { useAuth } from "../../../../_custom/hooks/UseAuth";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { CUSTOM_ROUTES } from "../../../../app/routing/PrivateRoutes";
import { DisplayEnum } from "../../../../app/routing/Enums/DisplayEnum";

const HeaderUserMenu: FC<{ show?: boolean }> = ({ show }) => {
  const { user, operations } = useAuth();
  // const _operations = operations.filter(isAccountRoute);
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(
        "menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px",
        { show }
      )}
      data-kt-menu='true'
      style={{
        ...(show && {
          zIndex: 107,
          position: "fixed",
          inset: "0px 0px auto auto",
          margin: "0px",
          transform: "translate(-30px, 70px)",
        }),
      }}
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-60px me-5'>
            <div className='symbol-label fs-3 bg-light-primary text-primary'>
              {(user.firstName[0] || "") + (user.lastName[0] || "")}
            </div>
            {/*{user.contentUrl ?*/}
            {/*  <img src={toAbsoluteApi(user.contentUrl)} alt='' />:*/}
            {/*  <div className="symbol-label fs-3 bg-light-primary text-primary">{user.firstName[0] + user.lastName[0]}</div>*/}
            {/*}*/}
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {user["@title"]}
            </div>
            <span className='fw-bold text-muted text-hover-primary fs-7 cursor-pointer text-truncate'>
              {user.email}
            </span>
            <span className='fw-bold text-muted text-hover-primary fs-7 cursor-pointer'>
              @{user.username}
            </span>
          </div>
        </div>
        {user.role && (
          <span className='badge badge-light-primary fw-bolder w-100'>
            {user.role.name}
          </span>
        )}
      </div>

      {/*{_operations.length > 0 && (*/}
      {/*  <>*/}
      {/*    <div className='separator my-2'/>*/}
      {/*    {_operations.map(route => (*/}
      {/*      <div key={route.id} className='menu-item px-5'>*/}
      {/*        <Link to={route.treePath+''} className='menu-link px-5'>*/}
      {/*          {route.title}*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </>*/}
      {/*)}*/}

      {/*<div className='menu-item px-5'>*/}
      {/*  <a href='#' className='menu-link px-5'>*/}
      {/*    <span className='menu-text'>My Projects</span>*/}
      {/*    <span className='menu-badge'>*/}
      {/*      <span className='badge badge-light-danger badge-circle fw-bolder fs-7'>3</span>*/}
      {/*    </span>*/}
      {/*  </a>*/}
      {/*</div>*/}

      {/*<div*/}
      {/*  className='menu-item px-5'*/}
      {/*  data-kt-menu-trigger='hover'*/}
      {/*  data-kt-menu-placement='left-start'*/}
      {/*  data-kt-menu-flip='bottom'*/}
      {/*>*/}
      {/*  <a href='#' className='menu-link px-5'>*/}
      {/*    <span className='menu-title'>My Subscription</span>*/}
      {/*    <span className='menu-arrow'/>*/}
      {/*  </a>*/}

      {/*  <div className='menu-sub menu-sub-dropdown w-175px py-4'>*/}
      {/*    <div className='menu-item px-3'>*/}
      {/*      <a href='#' className='menu-link px-5'>*/}
      {/*        Referrals*/}
      {/*      </a>*/}
      {/*    </div>*/}

      {/*    <div className='menu-item px-3'>*/}
      {/*      <a href='#' className='menu-link px-5'>*/}
      {/*        Billing*/}
      {/*      </a>*/}
      {/*    </div>*/}

      {/*    <div className='menu-item px-3'>*/}
      {/*      <a href='#' className='menu-link px-5'>*/}
      {/*        Payments*/}
      {/*      </a>*/}
      {/*    </div>*/}

      {/*    <div className='menu-item px-3'>*/}
      {/*      <a href='#' className='menu-link d-flex flex-stack px-5'>*/}
      {/*        Statements*/}
      {/*        <i*/}
      {/*          className='fas fa-exclamation-circle ms-2 fs-7'*/}
      {/*          data-bs-toggle='tooltip'*/}
      {/*          title='View your statements'*/}
      {/*        />*/}
      {/*      </a>*/}
      {/*    </div>*/}

      {/*    <div className='separator my-2'/>*/}

      {/*    <div className='menu-item px-3'>*/}
      {/*      <div className='menu-content px-3'>*/}
      {/*        <label className='form-check form-switch form-check-custom form-check-solid'>*/}
      {/*          <input*/}
      {/*            className='form-check-input w-30px h-20px'*/}
      {/*            type='checkbox'*/}
      {/*            value='1'*/}
      {/*            defaultChecked={true}*/}
      {/*            name='notifications'*/}
      {/*          />*/}
      {/*          <span className='form-check-label text-muted fs-7'>Notifications</span>*/}
      {/*        </label>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className='menu-item px-5'>*/}
      {/*  <a href='#' className='menu-link px-5'>*/}
      {/*    My Statements*/}
      {/*  </a>*/}
      {/*</div>*/}

      <div className='separator my-2' />
      <Languages />
      <div className='separator my-2' />
      <div className='menu-item px-5'>
        {CUSTOM_ROUTES.filter((route) =>
          route.display.includes(DisplayEnum.USER_MENU)
        ).map((route) => (
          <Link
            to={`/${route.path}`}
            className='menu-link px-5'
            // onClick={() => {
            //   dispatch(auth.actions.logout());
            // }}
          >
            <Trans id={route.title} />
          </Link>
        ))}
      </div>
      <div className='menu-item px-5'>
        <a
          className='menu-link px-5'
          onClick={() => {
            dispatch(auth.actions.logout());
          }}
        >
          <Trans id='SIGN_OUT' />
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
