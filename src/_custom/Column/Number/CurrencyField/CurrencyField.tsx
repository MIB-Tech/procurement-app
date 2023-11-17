import React, { FC } from 'react';
import clsx from 'clsx';
import { InputNumberProps } from '../InputNumber/InputNumber';
import { NumberField } from '../NumberField';


export type Props = {
  currency?: string
} & Partial<InputNumberProps>

export const CurrencyField: FC<Props> = ({ name = 'currency', currency, className, ...props }) => {
  return (
    <div className='position-relative'>
      <NumberField
        name={name}
        className={clsx('pe-20', className)}
        {...props}
      />
      <div className='position-absolute translate-middle-y top-50 end-0 me-12'>
        {currency}
      </div>
    </div>
  );
}