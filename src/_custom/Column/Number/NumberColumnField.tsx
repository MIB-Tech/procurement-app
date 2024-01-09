import React, {FC} from 'react';
import {NumberColumn, NumberFormat} from './NumberColumn';
import {CurrencyField} from './CurrencyField';
import {NumberField} from './NumberField';
import {FieldProps} from '../controls/fields';
import {InputNumberProps} from './InputNumber/InputNumber';
import {useField} from 'formik';


export const NumberColumnField: FC<Pick<NumberColumn<any>, 'format'> & FieldProps & InputNumberProps> = (
  {
    format,
    ...props
  }) => {
  const [field, , {setValue}] = useField({name: props.name});

  switch (format) {
    case NumberFormat.Amount:
      return <CurrencyField {...props} />;
    case NumberFormat.Percent:
      return (
        <NumberField
          {...props}
          value={field.value * 100}
          onChange={e => setValue(parseFloat(e.target.value) / 100)}
        />
      );
    default:
      return <NumberField {...props} />;
  }
};