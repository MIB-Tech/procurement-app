import React, { FC, HTMLAttributes, ReactNode } from 'react';
import { SVG } from '../components/SVG/SVG';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ConfirmButton } from '../components/Button/ConfirmButton';
import { Trans } from '../components/Trans';


type Props = {
  onConfirm: () => void
  onCancel?: () => void
  isSubmitting?: boolean
  title: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>

export const DeleteConfirm: FC<Props> = ({ title, className, isSubmitting, onConfirm, onCancel, children }) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        'alert alert-dismissible bg-white d-flex flex-center flex-column py-10 px-10 px-lg-20 mb-10 border -border-dashed -border-danger',
        className
      )}>
      <SVG path='/abstract/abs012.svg' size='5tx' variant='danger' className='mb-10' />
      <div className='text-center'>
        <div className='fw-bolder fs-1 mb-1'>
          {title}
        </div>
        <div className='separator border-3 mb-3' />
        <div className='fs-4 mb-5'>
          <Trans id='DELETE_CONFIRM.DESCRIPTION' />
        </div>
        <div className='mb-9'>
          {children}
        </div>
        <div className='d-flex flex-center flex-wrap'>
          <Button
            variant='light'
            className='m-2'
            onClick={() => {
              onCancel ? onCancel() : navigate(-1);
            }}
          >
            <Trans id='CANCEL' />
          </Button>
          <ConfirmButton
            className='m-2'
            loading={isSubmitting}
            onClick={() => {
              onConfirm();
            }}
          />
        </div>
      </div>
    </div>
  );
};