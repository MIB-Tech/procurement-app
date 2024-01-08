import {FC, HTMLAttributes} from 'react';
import clsx from 'clsx';


type CurrencyProps = {
  value: number
  unit?: string,
  precision?: number
} & HTMLAttributes<HTMLDivElement>
export const getFormattedNumber = ({value, unit = 'DH', precision}: Omit<CurrencyProps, 'className'>) => {
  const numberFormat = new Intl.NumberFormat(
    'fr-MA', {
      style: 'decimal',
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
      // useGrouping: true,
    });

  return numberFormat.format(value).replaceAll('.', ' ');
};
export const getNumberUnit = ({value,  unit = 'DH', precision}: Omit<CurrencyProps, 'className'>) => `${getFormattedNumber({value, precision})} ${unit}`
export const NumberUnit: FC<CurrencyProps> = ({value, unit = 'DH', precision, className}) => (
  <div>
    <span className={clsx('text-gray-700 me-1 text-nowrap', className)}>
      {getFormattedNumber({value, precision})}
    </span>
    <span className='text-gray-500 align-self-start fs-8'>{unit}</span>
  </div>
);