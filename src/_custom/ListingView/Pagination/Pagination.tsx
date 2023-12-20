import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { PaginationProps } from './Pagination.types';
import { usePagination } from '@mui/lab';
import { Trans } from '../../components/Trans';
import { SVG } from '../../components/SVG/SVG';
import { Button } from '../../components/Button';
import { Dropdown } from 'react-bootstrap';

import { DivToggle } from '../Filter/DivToggle';


const map: Record<'first' | 'last' | 'next' | 'previous', string> = {
  first: '/arrows/arr079.svg',
  last: '/arrows/arr080.svg',
  next: '/arrows/arr071.svg',
  previous: '/arrows/arr074.svg'
};
const Pagination = ({ pageLess, ...props }: PaginationProps) => {
  const {
    onPageChange,
    onItemsPerPageChange,
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
      count: Math.ceil(totalCount / (itemsPerPage || 1)),
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
            itemsPerPage: itemsPerPage && Math.min(totalCount, itemsPerPage)
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
        {onItemsPerPageChange && (
          <li className='page-item'>
            <Dropdown>
              <Dropdown.Toggle
                as={DivToggle}
              >
                <Button
                  variant='outline-default'
                  size='sm'
                  className='rounded bg-white'
                >
                  <Trans id='PER_PAGE' />: {itemsPerPage || `All (${totalCount})`}
                </Button>
              </Dropdown.Toggle>
              <Dropdown.Menu align='start'>
                {[12, 24, 48, 96, undefined].map(itemsPerPage => (
                  <Dropdown.Item
                    key={itemsPerPage || totalCount}
                    onClick={() => onItemsPerPageChange(itemsPerPage)}
                  >
                    {itemsPerPage || `All (${totalCount})`}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        )}
        {items.filter(({ type }) => {
          if (pageLess) {
            switch (type) {
              case 'start-ellipsis':
              case 'end-ellipsis':
              case 'page':
                return false
            }
          }

          return true
        }).map(({ page, type, selected, disabled, ...item }, index) => {
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
                <Button
                  variant='outline-primary'
                  size='sm'
                  icon
                  className='page-link'
                  {...item}
                  disabled={selected || disabled}
                >
                  {page}
                </Button>
              );
              break;
            default:
              children = (
                <Button
                  variant='outline-default'
                  size='sm'
                  icon
                  className='page-link rounded'
                  {...item}
                >
                  <SVG path={map[type]} size='4' />
                </Button>
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
