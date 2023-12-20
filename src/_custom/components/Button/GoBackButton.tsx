import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from './index';
import { Trans } from '../Trans';
import clsx from 'clsx';


type GoBackButtonProps = Omit<ButtonProps, 'onClick'>
export const GoBackButton: FC<GoBackButtonProps> = ({ children, className, ...props }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant='outline-default'
      {...props}
      className={clsx('bg-white', className)}
      onClick={() => navigate(-1)}
    >
      {children || <Trans id='BACK' />}
    </Button>
  );
};