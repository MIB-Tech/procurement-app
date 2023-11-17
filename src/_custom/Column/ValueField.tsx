import React from 'react';
import { FormControlProps, InputBackground } from './String/InputBase/Input.types';
import { TypeColum } from '../types/ModelMapping';
import { StringField } from './String/StringField';
import { BooleanField } from './Boolean/BooleanField';
import { ArrayField } from './Array/ArrayField';
import { ModelField } from './Model/ModelField';
import { NumberColumnField } from './Number/NumberColumnField';
import { ColumnTypeEnum } from '../types/types';


export type ValueFieldProps = {
  name: string
  column: TypeColum
  className?: string
} & FormControlProps
export const ValueField = ({ column, name, size, className }: ValueFieldProps) => {
  const rest = { size, className, background: 'solid' as InputBackground, name };
  const { type } = column;

  switch (type) {
    case ColumnTypeEnum.Number:
      return (
        <NumberColumnField
          format={column.format}
          {...rest}
        />
      );
    case ColumnTypeEnum.Boolean:
      return (
        <BooleanField {...rest} />
      );
    case ColumnTypeEnum.String:
      return (
        <StringField
          column={column}
          {...rest}
        />
      );
    case ColumnTypeEnum.Array:
      return (
        <ArrayField {...rest} />
      )
    default:
      return (
        <ModelField
          modelName={type}
          column={column}
          {...rest}
        />
      )
  }
};