import React, { FC } from 'react';
import { ActionDropdownProps } from './RouteAction.types';
import { GrantedLink, useAuth } from '../../hooks/UseAuth';
import clsx from 'clsx';
import { Help } from '../Help';
import { Button } from '../Button';
import { SVG } from '../SVG/SVG';
import { IconButton } from '../Button/IconButton';


export const RouteLinks: FC<ActionDropdownProps> = ({ itemOperations, className }) => {
  const { routes } = useAuth();

  return (
    <div className={clsx(`d-flex flex-wrap align-items-center gap-2 gap-lg-3`, className)}>
      {itemOperations.map(({ routeKey, path }) => {
        const route = routes.find((route) => route.routeKey === routeKey);
        if (!route) return;

        return (
          <GrantedLink
            key={routeKey}
            routeKey={routeKey}
            to={path}
          >
            {route.icon ?
              <Help overlay={route.title}>
                <Button
                  variant='light-primary'
                  size='sm'
                  className='d-flex gap-2'
                >
                  <SVG path={route.icon} size='4' />
                  <span className='d-none d-sm-block'>{route.contextualTitle || route.title}</span>
                </Button>
              </Help> :
              route.title
            }
          </GrantedLink>
        );
      })}
    </div>
  );
};