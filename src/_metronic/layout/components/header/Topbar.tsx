import clsx from 'clsx';
import React, {FC, useState} from 'react';
import {KTSVG} from '../../../helpers';
import {HeaderUserMenu, QuickLinks} from '../../../partials';
import {useLayout} from '../../core';
import {ClickAwayListener} from '@mui/material';
import {useAuth} from '../../../../_custom/hooks/UseAuth';
import {Button} from '../../../../_custom/components/Button';
import {atom} from 'recoil';
import {HydraItem} from '../../../../_custom/types/hydra.types';
import {ModelEnum} from '../../../../app/modules/types';
import {Trans} from '../../../../_custom/components/Trans';


// export const locationState = atom<HydraItem<ModelEnum.Location> | null>({
//   key: 'LOCATION_STATE',
//   default: null
// });


const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1';

const Topbar: FC = () => {
  const { config } = useLayout();
  const [userToolbarOpen, setUserToolbarOpen] = useState<boolean>();
  const [locationLinkOpen, setLocationLinkOpen] = useState<boolean>();
  const { user/*, location*/ } = useAuth();


  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/*<div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>*/}
      {/*  <UserMenu />*/}
      {/*</div>*/}
      {/* Activities */}
      {/*<div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>*/}
      {/*  /!* begin::Drawer toggle *!/*/}
      {/*  <div*/}
      {/*    className={clsx('btn btn-icon btn-active-light-primary', toolbarButtonHeightClass)}*/}
      {/*    id='kt_activities_toggle'*/}
      {/*  >*/}
      {/*    <KTSVG*/}
      {/*      path='/media/icons/duotune/general/gen032.svg'*/}
      {/*      className={toolbarButtonIconSizeClass}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  /!* end::Drawer toggle *!/*/}
      {/*</div>*/}
      {/* Quick links */}
      <ClickAwayListener onClickAway={() => {
        if (locationLinkOpen) {
          setLocationLinkOpen(false);
        }
      }}>
        <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          {/*{activeLocation ?*/}
          {/*  <ModelCell item={activeLocation} />:*/}
          {/*  <Trans id='LOCATION' />*/}
          {/*}*/}
          {/* begin::Menu wrapper */}
          <Button
            flush
            // size='sm'
            className={clsx(
              // 'w-100px text-truncate fw-boldest text-hover-primary'
              // activeLocation && 'text-primary'
            )}
            onClick={() => {
              // if (!user.location) {
              //   setLocationLinkOpen(!locationLinkOpen);
              // }
            }}
          >
            {/*<SVG path='/ecommerce/ecm008.svg' size='1'/>*/}
            {/*<div>*/}
            {/*  {location ?*/}
            {/*    <a*/}
            {/*      href='#'*/}
            {/*      className={clsx(*/}
            {/*        'btn btn-sm bg-light-primary border border-2 border-primary fw-bolder text-primary w-100 px-4',*/}
            {/*        // active && 'bg-light'*/}
            {/*      )}*/}
            {/*      onClick={e => {*/}
            {/*        e.preventDefault();*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      /!*<div className='d-sm-none'>{location['@title']}</div>*!/*/}
            {/*      /!*<div className='d-none d-sm-block'>{location['@subTitle']}</div>*!/*/}
            {/*      /!*<div className='d-sm-none'>{location['@subTitle']}</div>*!/*/}
            {/*    </a>*/}
            {/*    /*<div className='text-end w-125px'>*/}
            {/*      <div className='text-muted text-truncate fs-6'>*/}
            {/*        {location['@subTitle']}*/}
            {/*      </div>*/}
            {/*      <div>*/}
            {/*        {location['@title']}*/}
            {/*      </div>*/}
            {/*    </div>*/ }
            {/*    <span className='w-100px text-truncate fw-boldest text-hover-primary'>*/}
            {/*      <Trans id='LOCATION' />*/}
            {/*    </span>*/}
            {/*  }*/}
            {/*</div>*/}
          </Button>
          <QuickLinks show={locationLinkOpen} />
          {/* end::Menu wrapper */}
        </div>
      </ClickAwayListener>
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <div className='bullet bg-secondary h-35px w-1px mx-2'></div>
      </div>


      {/* CHAT */}
      {/*<div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>*/}
      {/*  /!* begin::Menu wrapper *!/*/}
      {/*  <div*/}
      {/*    className={clsx(*/}
      {/*      'btn btn-icon btn-active-light-primary position-relative',*/}
      {/*      toolbarButtonHeightClass*/}
      {/*    )}*/}
      {/*    id='kt_drawer_chat_toggle'*/}
      {/*  >*/}
      {/*    <KTSVG*/}
      {/*      path='/media/icons/duotune/communication/com012.svg'*/}
      {/*      className={toolbarButtonIconSizeClass}*/}
      {/*    />*/}

      {/*    <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>*/}
      {/*  </div>*/}
      {/*  /!* end::Menu wrapper *!/*/}
      {/*</div>*/}

      {/* NOTIFICATIONS */}
      {/*<div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>*/}
      {/*  /!* begin::Menu- wrapper *!/*/}
      {/*  <div*/}
      {/*    className={clsx(*/}
      {/*      'btn btn-icon btn-active-light-primary position-relative',*/}
      {/*      toolbarButtonHeightClass*/}
      {/*    )}*/}
      {/*    data-kt-menu-trigger='click'*/}
      {/*    data-kt-menu-attach='parent'*/}
      {/*    data-kt-menu-placement='bottom-end'*/}
      {/*    data-kt-menu-flip='bottom'*/}
      {/*  >*/}
      {/*    <KTSVG*/}
      {/*      path='/media/icons/duotune/general/gen022.svg'*/}
      {/*      className={toolbarButtonIconSizeClass}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <HeaderNotificationsMenu />*/}
      {/*  /!* end::Menu wrapper *!/*/}
      {/*</div>*/}

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        <ClickAwayListener onClickAway={() => {
          if (userToolbarOpen) {
            setUserToolbarOpen(false);
          }
        }}>
          <div>
            <div
              className='cursor-pointer'
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='bottom'
              onClick={() => setUserToolbarOpen(!userToolbarOpen)}
            >
              <div className='d-flex align-items-center'>
                <div className='text-end'>
                <span className='text-dark fw-bolder text-hover-primary fs-6'>
                  {user['@title']}
                </span>
                  {user.role && (
                    <div className='text-muted fw-bold text-muted fs-7'>
                      {user.role?.name}
                    </div>
                  )}
                </div>
                <div className='symbol symbol-40px ms-5'>
                  <div
                    className='symbol-label fs-3 bg-light-primary text-primary'>{user.firstName[0] + user.lastName[0]}</div>
                  {/*{user.contentUrl ?*/}
                  {/*  <img src={toAbsoluteApi(user.contentUrl)} alt='' />:*/}
                  {/*  <div className="symbol-label fs-3 bg-light-primary text-primary">{user.firstName[0] + user.lastName[0]}</div>*/}
                  {/*}*/}
                </div>
              </div>
            </div>
            <HeaderUserMenu show={userToolbarOpen} />
          </div>
        </ClickAwayListener>
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export {Topbar}
