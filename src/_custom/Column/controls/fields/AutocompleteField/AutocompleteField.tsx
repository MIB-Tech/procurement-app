import React, { ElementType } from 'react';
import { useField } from 'formik';
import { AutocompleteBase, DefaultChipComponent, UndefinedBool } from '../../base/Autocomplete';
import { Props } from './AutocompleteField.types';
import { Field } from '../index';
import clsx from 'clsx';


const AutocompleteField = <T,
  Multiple extends UndefinedBool,
  DisableClearable extends UndefinedBool,
  FreeSolo extends UndefinedBool,
  ChipComponent extends ElementType = DefaultChipComponent>(
  { name, feedbackLabel, className, ...props }: Props<T, Multiple, DisableClearable, FreeSolo, ChipComponent>
) => {
  const [{ multiple, ...field }, { error }, { setValue, setTouched }] = useField({ name });

  return (
    <Field name={name} feedbackLabel={feedbackLabel}>
      <AutocompleteBase
        {...field}
        onChange={(_, newValue) => setValue(newValue)}
        className={clsx(className, error && 'is-invalid')}
        {...props}
        // onBlur={() => setTouched(true)}
        // onFocus={e => {
        //   props.onFocus?.(e)
        //   setTouched(true)
        // }}
      />
    </Field>
  );
};

export default AutocompleteField;