import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { PaginationProps } from './Pagination.types';
import { usePagination } from '@mui/lab';
import { Trans } from '../../components/Trans';
import { SVG } from '../../components/SVG/SVG';


const map: Record<'first' | 'last' | 'next' | 'previous', string> = {
  first: '/arrows/arr079.svg',
  last: '/arrows/arr080.svg',
  next: '/arrows/arr071.svg',
  previous: '/arrows/arr074.svg'
};
const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    size,
    totalCount,
    outline,
    circle,
    className,
    itemsPerPage
  } = props;
  const { items } = usePagination(
    {
      ...props,
      count: Math.ceil(totalCount / itemsPerPage),
      onChange: (event, value) => {
        onPageChange(value);
      }
    }
  );

  return (
    <div className={clsx('d-flex flex-stack flex-wrap', className)}>
      <div className='fs-6 fw-bold text-gray-700'>
        <Trans
          id='PAGINATION.TITLE'
          values={{
            totalCount,
            itemsPerPage: Math.min(totalCount, itemsPerPage)
          }}
        />
      </div>
      <ul
        className={clsx(
          'pagination d-flex',
          outline && 'pagination-outline',
          circle && 'pagination-circle',
          size && `pagination-${size}`
        )}
      >
        {items.map(({ page, type, selected, disabled, ...item }, index) => {
          let children: ReactNode = '';

          switch (type) {
            case 'start-ellipsis':
            case 'end-ellipsis':
              children = (
                <button className='page-link'>
                  ...
                </button>
              );
              break;
            case 'page':
              children = (
                <button
                  className='page-link'
                  {...item}
                  disabled={selected || disabled}
                >
                  {page}
                </button>
              );
              break;
            default:
              children = (
                <button className='page-link' {...item}>
                  <SVG path={map[type]} size='4' />
                </button>
              );
          }

          return (
            <li
              key={index}
              className={clsx(
                'page-item',
                ['next', 'previous'].includes(type) && type,
                { active: selected, disabled }
              )}
            >
              {children}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
