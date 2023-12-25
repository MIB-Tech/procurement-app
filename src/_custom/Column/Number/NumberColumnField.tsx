import React, {FC} from 'react';
import {NumberColumn, NumberFormat} from './NumberColumn';
import {CurrencyField} from './CurrencyField';
import {NumberField} from './NumberField';
import {FieldProps} from '../controls/fields';
import {InputNumberProps} from './InputNumber/InputNumber';


export const NumberColumnField: FC<Pick<NumberColumn, 'format'> & FieldProps & InputNumberProps> = (
  {
    format,
    ...props
  }) => {

  switch (format) {
    case NumberFormat.Amount:
      return <CurrencyField {...props} />;
    default:
      return <NumberField {...props} />;
  }
};