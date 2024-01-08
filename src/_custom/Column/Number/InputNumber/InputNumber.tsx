import React, { FC, forwardRef } from 'react';
import { Input, InputProps } from '../../String/InputBase/Input';
import { KTSVG } from '../../../../_metronic/helpers';
import { Button, ButtonProps } from '../../../components/Button';
import { makeStyles } from '@mui/styles';
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
  min?: number,
  max?: number,
  value?: number,
  step?: number,
  precision?: number,
  onChange?: (value: number) => void
  hideAdornment?: boolean
} & Omit<InputProps, 'onChange' | 'min' | 'max' | 'step' | 'value'>


export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(({ className, hideAdornment, ...props }, ref) => {
  const classes = useStyles();
  const {
    value = 0,
    step = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    precision,
    onChange = () => {
    }
  } = props;


  const handlePrecise = (newValue: number) => {
    onChange(precision ? toPrecision(newValue, precision) : newValue);
  };

  const handleChange = (newValue: number, type?: '+' | '-') => {

    switch (type) {
      case '-':
        switch (true) {
          case newValue < min:
            handlePrecise(min);
            break;
          case value > max:
            handlePrecise(max);
            break;
          default:
            handlePrecise(newValue);
        }
        break;
      case '+':
        switch (true) {
          case newValue > max:
            handlePrecise(max);
            break;
          case value < min:
            handlePrecise(min);
            break;
          default:
            handlePrecise(newValue);
        }
        break;
      default:
        switch (true) {
          case newValue < min:
            handlePrecise(min);
            break;
          case value > max:
            handlePrecise(max);
            break;
          default:
            handlePrecise(newValue);
        }
    }

  };

  return (
    <div className={clsx(!hideAdornment && 'position-relative')}>
      {!hideAdornment && (
        <InputNumberButton
          className='start-0'
          path='/media/icons/duotune/general/gen036.svg'
          onClick={() => {
            handleChange(value - step);
          }}
          disabled={value <= min}
        />
      )}
      <Input
        className={clsx(
          !hideAdornment && clsx('px-12', classes.input),
          className
          // 'border-left-0 border-right-0'
        )}
        {...props}
        onChange={event => {
          console.log(event.target.value, event.target.valueAsNumber)
          return handleChange(event.target.valueAsNumber)
        }}
        ref={ref}
        type='number'
      />
      {!hideAdornment && (
        <InputNumberButton
          className='end-0'
          path='/media/icons/duotune/general/gen035.svg'
          onClick={() => {
            handleChange(value + step);
          }}
          disabled={value >= max}
        />
      )}
    </div>
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