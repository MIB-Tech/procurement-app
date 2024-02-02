import clsx from 'clsx';
import React, {FC} from 'react';
import {Link, matchPath, uselocation} from 'react-router-dom';
import {useLayout, usePageData} from '../../../core';
import {useAuth} from '../../../../../_custom/hooks/UseAuth';
import {SVG} from '../../../../../_custom/components/SVG/SVG';
import {OperationModel} from '../../../../../app/modules/Operation';


export const useCurrentOperation: () => OperationModel | undefined = () => {
  const {operations, getPath} = useAuth();
  const {pathname} = uselocation();

  return operations.find(({suffix, resource}) => {
    const path = getPath({suffix, resourceName: resource.name});

    return matchPath(path, pathname);
  });
};

const DefaultTitle: FC = () => {
  const { pageTitle, pageDescription, pageBreadcrumbs } = usePageData();
  const { config, classes } = useLayout();
  const currentOperation = useCurrentOperation();
  const icon = currentOperation?.icon;

  return (
    <div
      id='kt_page_title'
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      // data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
      className={clsx('page-title d-flex', classes.pageTitle.join(' '))}
    >
      {icon && (
        <div>
          <SVG path={icon} variant='primary' size='1' className='me-3' />
        </div>
      )}
      <div className='d-flex align-items-center text-dark fw-bolder fs-3'>
        {currentOperation?.title || pageTitle}
        {pageTitle && pageDescription && config.pageTitle && config.pageTitle.description && (
          <>
            <span className='h-20px border-gray-200 border-start ms-3 mx-2' />
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
