import React, { FC } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import { Field } from '../../controls/fields';
import { Props } from './DateField.types';
import { DatePicker } from '../Date/DatePicker';


export const DateField: FC<Props> = ({ name, feedbackLabel, className, ...props }) => {
  const [field, { error }, helpers] = useField({ name });

  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      <DatePicker
        {...field}
        {...props}
        onChange={date => {
          helpers.setValue(date);
        }}
        className={clsx(className, error && 'is-invalid')}
      />
    </Field>
  );
};