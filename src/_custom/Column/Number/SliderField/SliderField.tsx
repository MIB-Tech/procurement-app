import React, { FC } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import { Field, FieldProps } from '../../controls/fields';
import { RangeProps, Slider } from '../Slider/Slider';
import { toPrecision } from '../InputNumber/InputNumber';


export type SliderFieldProps = {
  precision?: number
} & FieldProps & RangeProps

export const SliderField: FC<SliderFieldProps> = ({ name, feedbackLabel, precision, className, ...props }) => {
  const [field, meta, helpers] = useField({ name });
  const { error } = meta;

  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      <div className='px-5'>
        <Slider
          className={clsx(className, error && 'text-danger')}
          {...field}
          onChange={(event, value) => {
            let newValue = value;
            if (precision) {
              newValue = typeof value === 'number' ?
                toPrecision(value, precision) :
                value.map(val => toPrecision(val, precision));
            }

            helpers.setValue(newValue);
          }}
          {...props}
        />
      </div>
    </Field>
  );
};