import React, { FC } from 'react';
import { NumberColumn, NumberFormat } from './NumberColumn';
import { CurrencyField } from './CurrencyField';
import { NumberField } from './NumberField';
import { FieldProps } from '../controls/fields';


export const NumberColumnField: FC<Pick<NumberColumn, 'format'> & FieldProps> = ({ format, ...props }) => {

  switch (format) {
    case NumberFormat.Currency:
      return <CurrencyField {...props} />;
    default:
      return <NumberField {...props} />;
  }
};