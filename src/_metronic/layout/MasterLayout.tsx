import React, {useEffect} from 'react'
import {AsideDefault} from './components/aside/AsideDefault'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {Toolbar} from './components/toolbar/Toolbar'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import { usePageData } from './core';
import { Outlet, useLocation } from 'react-router-dom';
import {
  DrawerMessenger,
  ActivityDrawer,
  Main,
  InviteUsers,
  UpgradePlan,
} from '../partials'
import {MenuComponent} from '../assets/ts/components'
import { LinearProgress } from '@mui/material';

const MasterLayout: React.FC = ({children}) => {
  const {pageLoading} = usePageData()
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <>
      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper />
          <div className='h-3px'>
            {pageLoading && (
              <LinearProgress className='h-3px' color="inherit"/>
            )}
          </div>

          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
            <Toolbar />
            <div className='post d-flex flex-column-fluid' id='kt_post'>
              <Content>
                {children}
                <Outlet />
              </Content>
            </div>
          </div>
          {/*<Footer />*/}
        </div>
      </div>

      {/* begin:: Drawers */}
      <ActivityDrawer />
      {/*<ExploreMain />*/}
      <DrawerMessenger />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <Main />
      <InviteUsers />
      <UpgradePlan />
      {/* end:: Modals */}
      <ScrollTop />
    </>
  )
}

export {MasterLayout}
