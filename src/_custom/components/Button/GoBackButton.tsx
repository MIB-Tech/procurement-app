import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from './index';
import { Trans } from '../Trans';


type GoBackButtonProps = Omit<ButtonProps, 'onClick'>
export const GoBackButton: FC<GoBackButtonProps> = ({ children, ...props }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant='light'
      {...props}
      onClick={() => navigate(-1)}
    >
      {children || <Trans id='BACK' />}
    </Button>
  );
};