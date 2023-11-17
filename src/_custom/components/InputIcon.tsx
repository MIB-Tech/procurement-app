import { IconButton, IconButtonProps } from './Button/IconButton';
import React, { FC } from 'react';
import clsx from 'clsx';


export type InputIconPosition = 'start' | 'end'
type InputIconProps = {
  position?: InputIconPosition
} & IconButtonProps
export const InputIcon: FC<InputIconProps> = ({ className, position = 'end', ...props }) => (
  <IconButton
    size='1'
    className={clsx(
      'position-absolute translate-middle-y top-50',
      position === 'start' ? 'start-0' : 'end-0',
      className
    )}
    {...props}
  />
);

