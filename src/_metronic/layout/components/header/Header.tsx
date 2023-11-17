import React, {FC} from 'react'
import { DefaultTitle } from './page-title/DefaultTitle';
import { MegaMenu } from './MegaMenu';
import { MenuInner } from './MenuInner';

const Header: FC = () => {
  return (
    <div
      className='header-menu align-items-stretch'
      data-kt-drawer='true'
      data-kt-drawer-name='header-menu'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_header_menu_mobile_toggle'
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
    >
      {/* Quick links */}
      {/*<div>*/}
      {/*  /!* begin::Menu wrapper *!/*/}
      {/*  <div*/}
      {/*    className={'btn btn-active-light-primary '}*/}
      {/*    data-kt-menu-trigger='click'*/}
      {/*    data-kt-menu-attach='parent'*/}
      {/*    data-kt-menu-placement='bottom-start'*/}
      {/*    data-kt-menu-flip='bottom'*/}
      {/*  >*/}
      {/*    <KTSVG*/}
      {/*      path='/media/icons/duotune/general/gen025.svg'*/}
      {/*      className={'svg-icon-1'}*/}
      {/*    />*/}
      {/*    #Achats*/}
      {/*  </div>*/}
      {/*  <QuickLinks />*/}
      {/*  /!* end::Menu wrapper *!/*/}
      {/*</div>*/}

      <div
        className='menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch'
        id='#kt_header_menu'
        data-kt-menu='true'
      >
        <DefaultTitle />
        {/*<MenuInner />*/}
      </div>
    </div>
  )
}

export {Header}
