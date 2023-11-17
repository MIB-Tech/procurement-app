import React, { FC } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import { Field } from '../../controls/fields';
import { Props } from './TimeField.types';
import { TimePicker } from '../Time/TimePicker';


export const TimeField: FC<Props> = ({ name, feedbackLabel, className, ...props }) => {
  const [field, meta, helpers] = useField({ name });
  const { error } = meta;

  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      <TimePicker
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