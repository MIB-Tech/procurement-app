import React from 'react'
import clsx from 'clsx'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import { RouteModel } from '../../../../app/modules/Route';

type Props = {
  fontIcon?: string
} & Omit<RouteModel, 'children'>

const AsideMenuItemWithSub: React.FC<Props> = ({
  children,
  treePath,
  title,
  icon,
  fontIcon,
}) => {
  const {pathname} = useLocation()
  const isActive = treePath && checkIsActive(pathname, treePath)
  const {config} = useLayout()
  const {aside} = config

  return (
    <div
      className={clsx('menu-item', {'here show': isActive}, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {!icon && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'/>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}/>}
        <span className='menu-title text-truncate d-block'>{title}</span>
        <span className='menu-arrow'/>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', {'menu-active-bg': isActive})}>
        {children}
      </div>
    </div>
  )
}

export {AsideMenuItemWithSub}
