import React, {FC} from 'react';
import {NumberColumn, NumberFormat} from './NumberColumn';
import {CurrencyField} from './CurrencyField';
import {NumberField} from './NumberField';
import {FieldProps} from '../controls/fields';
import {InputNumberProps} from './InputNumber/InputNumber';
import {useField} from 'formik';
import _ from 'lodash';

export const NumberColumnField: FC<Pick<NumberColumn<any>, 'format'> & FieldProps & InputNumberProps> = (
  {
    format,
    ...props
  }) => {
  const [field, , {setValue}] = useField({name: props.name});
  switch (format) {
    case NumberFormat.Amount:
      return <CurrencyField {...props}/>;
    case NumberFormat.Percent:
      return (
        <NumberField
          {...props}
          value={_.round(field.value * 100, props.precision || 2)}
          onChange={e => setValue(parseFloat(e.target.value) / 100)}
        />
      );
    default:
      return <NumberField {...props} />;
  }
};