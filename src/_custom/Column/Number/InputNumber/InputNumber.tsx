import React, {FC, forwardRef} from 'react';
import {Input, InputProps} from '../../String/InputBase/Input';
import {KTSVG} from '../../../../_metronic/helpers';
import {Button, ButtonProps} from '../../../components/Button';
import {makeStyles} from '@mui/styles';
import clsx from 'clsx';


const useStyles = makeStyles({
  input: {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      display: 'none'
    }
  }
});

export const toPrecision = (value: number, precision: number) => parseFloat(value.toFixed(precision));


export type InputNumberProps = {
  precision?: number
} & InputProps


export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(({precision, ...props}, ref) => {

  return (
    <Input
      {...props}
      onChange={event => {
        if (precision && (event.target.value.split('.')[1] || '').length > precision) {
          return
        }
        // const parsedValue = parseFloat(event.target.value);
        const parsedValue = parseFloat(event.target.value);
        console.log(parsedValue)
        const roundedValue = isNaN(parsedValue) ?
          '' :
          precision === undefined ? parsedValue.toString() : parsedValue.toFixed(precision)
        ;

        props.onChange?.({
          ...event,
          target: {
            ...event.target,
            name: props.name || '',
            value: roundedValue === '' ?
              '':
              parseFloat(roundedValue) as unknown as string
          }
        });
      }}
      ref={ref}
      type='number'

    />
  );
});


type InputNumberButtonProps = {
  path: string
} & ButtonProps
const InputNumberButton: FC<InputNumberButtonProps> = ({ path, className, ...props }) => {

  return (
    <Button
      icon
      className={clsx(
        'btn-active-color-gray-700 position-absolute translate-middle-y top-50',
        className
      )}
      {...props}
    >
      <KTSVG
        className={'svg-icon-1'}
        path={path}
      />
    </Button>
  );
};

export { InputNumberButton };