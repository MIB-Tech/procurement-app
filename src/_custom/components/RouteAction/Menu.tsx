import React, { forwardRef } from 'react';
import { ActionDropdownProps } from './RouteAction.types';
import { useAuth } from '../../hooks/UseAuth';
import { Link } from 'react-router-dom';
import { KTSVG } from '../../../_metronic/helpers';


export const Menu = forwardRef<HTMLDivElement, ActionDropdownProps>((props, ref) => {
  const { style, className, 'aria-labelledby': labeledBy, itemOperations } = props;
  const { routes } = useAuth();

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labeledBy}
    >
      <ul className='px-0 mb-0'>
        {itemOperations.map(({ path, routeKey }, index) => {
          const route = routes.find((route) => route.routeKey === routeKey);
          if (!route) return <></>;

          return (
            <Link key={index} to={path || route.treePath} className='text-gray-900'>
              <li className='dropdown-item'>
                {route.icon && <KTSVG path={route.icon} className='me-2' />}
                {route.contextualTitle || route.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
});