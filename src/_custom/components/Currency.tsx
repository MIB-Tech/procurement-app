import { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';


type CurrencyProps = {
  value: number
} & HTMLAttributes<HTMLDivElement>
export const Currency: FC<CurrencyProps> = ({ value, className }) => {

  return (
    <div className='d-flex align-items-center'>
      <div className={clsx('fw-bolder text-gray-800 me-1', className)}>
        {value.toLocaleString()}
      </div>
      <div className='fw-bold text-gray-400 align-self-start me-1'>MAD</div>
    </div>
  );
};