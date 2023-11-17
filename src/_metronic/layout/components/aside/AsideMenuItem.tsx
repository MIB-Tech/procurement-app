import React from 'react';
import clsx from 'clsx';
import { Link, useMatch } from 'react-router-dom';
import { useLocation } from 'react-router';
import { KTSVG } from '../../../helpers';
import { useLayout } from '../../core';
import { RouteModel } from '../../../../app/modules/Route';


type Props = {
  fontIcon?: string
  group?: boolean,
} & Omit<RouteModel, 'id' | 'children'>

const AsideMenuItem: React.FC<Props> = ({ fontIcon, group, ...route }) => {
  const { children, treePath = '', title, icon } = route;
  const { pathname } = useLocation();
  const { config } = useLayout();
  const { aside } = config;
  // const isActive = useMatch(treePath);
  const isActive = pathname.startsWith(treePath);

  if (group) {
    return (
      <div className='menu-item'>
        <div className={'menu-content pt-5 pb-2'}>
          <span className={clsx(
            'menu-section text-uppercase fs-8 ls-1',
            treePath && pathname.startsWith(treePath) ? 'fw-bolder text-primary' :'text-muted'
          )}>
            {title}
          </span>
        </div>
      </div>
    )
  }



  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', { active: isActive })} to={treePath}>
        {!icon && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot' />
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}/>}
        <span className='menu-title text-truncate d-block'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
