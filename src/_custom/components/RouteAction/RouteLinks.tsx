import React, { FC } from 'react';
import { ActionDropdownProps } from './RouteAction.types';
import { GrantedLink } from '../../hooks/UseAuth';
import clsx from 'clsx';
import { Help } from '../Help';
import { Button, ButtonProps } from '../Button';
import { SVG } from '../SVG/SVG';
import { Trans } from '../Trans';
import { LinkProps } from 'react-router-dom';
import { ViewEnum } from '../../types/ModelMapping';


export const RouteLinks: FC<ActionDropdownProps & {
  buttonProps?: ButtonProps,
  linkProps?: Omit<LinkProps, 'to'>
  useContextualTitle?: boolean
}> = ({
  operations,
  className,
  buttonProps,
  linkProps,
  params,
  useContextualTitle
}) => {

  return (
    <div className={clsx(`d-flex flex-wrap align-items-center gap-3`, className)}>
      {operations.map((operation, index) => {
        const { title, operationType, resource, icon, suffix } = operation;
        let variant = 'primary'
        switch (operationType) {
          case ViewEnum.Delete:
            variant = 'light-danger'
            break;
        }

        return (
          <GrantedLink
            key={index}
            resourceName={resource.name}
            operationType={operationType}
            suffix={suffix}
            params={params}
            {...linkProps}
          >
            <Help overlay={title}>
              <Button
                variant={variant}
                size='sm'
                {...buttonProps}
                className={clsx('d-flex gap-2', buttonProps?.className)}
              >
                {icon && <SVG path={icon} size='4' />}
                <span className='-d-none -d-sm-block'>
                  {useContextualTitle ?
                    <Trans id={operationType} />:
                    title
                  }
                </span>
              </Button>
            </Help>
          </GrantedLink>
        );
      })}
    </div>
  );
};