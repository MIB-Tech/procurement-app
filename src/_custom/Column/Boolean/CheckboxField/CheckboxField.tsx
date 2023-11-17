import React, { FC } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import { Field, FieldProps } from '../../controls/fields';
import { Checkbox, CheckboxProps } from '../Chechbox/Checkbox';


export type InputFieldProps = FieldProps & CheckboxProps

export const CheckboxField: FC<InputFieldProps> = ({ name, feedbackLabel, className, ...props }) => {
  const [field, { error }] = useField({ name });

  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      <Checkbox
        {...field}
        onChange={field.onChange}
        {...props}
        className={clsx(className, error && 'is-invalid')}
        checked={field.value}
      />
    </Field>
  );
};