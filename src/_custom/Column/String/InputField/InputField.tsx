import React, { FC } from 'react';
import { Input, InputProps } from '../InputBase/Input';
import { useField } from 'formik';
import clsx from 'clsx';
import { Field, FieldProps } from '../../controls/fields';


export type InputFieldProps = FieldProps & InputProps

export const InputField: FC<InputFieldProps> = ({ name, feedbackLabel, className, ...props }) => {
  const [field, meta] = useField({ name });
  const { error } = meta;

  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      <Input
        {...field}
        {...props}
        className={clsx(error && 'is-invalid', className)}
      />
    </Field>
  );
};