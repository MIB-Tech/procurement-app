import React from 'react';
import { Button } from '../index';
import { SVG } from '../../SVG/SVG';
import { IconButtonProps } from './IconButton.types';
import clsx from 'clsx';


export default ({ variant, activeVariant, path, size, children, ...props }: IconButtonProps) => (
  <Button
    size='sm'
    className='h-25px w-25px'
    icon
    flush
    activeVariant={clsx(activeVariant && `color-${activeVariant}`)}
    {...props}
  >
    <SVG
      path={path}
      size={size}
      className={clsx(variant && `svg-icon-${variant}`)}
    />
    {children}
  </Button>
)