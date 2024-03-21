import {FC, HTMLAttributes} from 'react';
import clsx from 'clsx';


type CurrencyProps = {
  value: number
  unit?: string | false,
  precision?: number
} & HTMLAttributes<HTMLDivElement>
export const getFormattedNumber = ({value, precision = 2}: Omit<CurrencyProps, 'unit' | 'className'>) => {
  const numberFormat = new Intl.NumberFormat(
    'fr-MA', {
      style: 'decimal',
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
      // useGrouping: true,
    });

  return numberFormat.format(value).replaceAll('.', ' ');
};
export const getNumberUnit = ({value,  unit = 'DH', precision}: Omit<CurrencyProps, 'className'>) => {
  return `${getFormattedNumber({value, precision})}${unit === false ? '': ` ${unit}`}`
}
export const NumberUnit: FC<CurrencyProps> = ({value, unit = 'DH', precision, className}) => (
  <div>
    <span className={clsx('text-gray-700 me-1 text-nowrap', className)}>
      {getFormattedNumber({value, precision})}
    </span>
    <span className='text-gray-500 align-self-start fs-8'>{unit}</span>
  </div>
);