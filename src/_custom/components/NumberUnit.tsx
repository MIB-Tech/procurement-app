import { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';


type CurrencyProps = {
  value: number
  unit?: string,
  precision?: number
} & HTMLAttributes<HTMLDivElement>

export const getNumberUnit = ({value,  unit = 'MAD', precision}: Omit<CurrencyProps, 'className'>) => `${value.toFixed(precision)} ${unit}`
export const NumberUnit: FC<CurrencyProps> = ({ value, unit = 'MAD',  precision, className }) => (
  <div>
    <span className={clsx('text-gray-700 me-1', className)}>
      {value.toFixed(precision)}
    </span>
    <span className='text-gray-500 align-self-start fs-8'>{unit}</span>
  </div>
)