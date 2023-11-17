import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';


export const ToolbarWrapper: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className='card mb-3'>
    <div className={clsx('card-body', className)} {...props} />
  </div>
);