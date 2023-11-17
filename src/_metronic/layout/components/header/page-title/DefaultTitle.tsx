import clsx from 'clsx'
import React, {FC} from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom';
import {useLayout, usePageData} from '../../../core'
import { KTSVG } from "../../../../helpers";
import { useAuth } from '../../../../../_custom/hooks/UseAuth';

export const useCurrentRoute = () => {
  const { routes } = useAuth();
  const { pathname } = useLocation();

  return routes.find(({ treePath }) => treePath && matchPath(treePath, pathname));
}

const DefaultTitle: FC = () => {
  const {pageTitle, pageDescription, pageBreadcrumbs} = usePageData()
  const {config, classes} = useLayout()
  const currentRoute = useCurrentRoute()

  return (
    <div
      id='kt_page_title'
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      // data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
      className={clsx('page-title d-flex', classes.pageTitle.join(' '))}
    >
      {currentRoute?.icon && <div><KTSVG path={currentRoute?.icon} className='svg-icon-primary svg-icon-1 me-3'/></div>}
      <div className='d-flex align-items-center text-dark fw-bolder fs-3'>
        {currentRoute?.title || pageTitle}
        {pageTitle && pageDescription && config.pageTitle && config.pageTitle.description && (
          <>
            <span className='h-20px border-gray-200 border-start ms-3 mx-2'/>
            <small className='text-muted fs-7 fw-bold my-1 ms-1'>{pageDescription}</small>
          </>
        )}
      </div>

      {pageBreadcrumbs &&
        pageBreadcrumbs.length > 0 &&
        config.pageTitle &&
        config.pageTitle.breadCrumbs && (
          <>
            {config.pageTitle.direction === 'row' && (
              <span className='h-20px border-gray-200 border-start mx-4'/>
            )}
            <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
              {Array.from(pageBreadcrumbs).map((item, index) => (
                <li
                  className={clsx('breadcrumb-item', {
                    'text-dark': !item.isSeparator && item.isActive,
                    'text-muted': !item.isSeparator && !item.isActive,
                  })}
                  key={`${item.path}${index}`}
                >
                  {!item.isSeparator ? (
                    <Link className='text-muted text-hover-primary' to={item.path}>
                      {item.title}
                    </Link>
                  ) : (
                    <span className='bullet bg-gray-200 w-5px h-2px'/>
                  )}
                </li>
              ))}
              <li className='breadcrumb-item text-dark'>{pageTitle}</li>
            </ul>
          </>
        )}
    </div>
  )
}

export {DefaultTitle}
