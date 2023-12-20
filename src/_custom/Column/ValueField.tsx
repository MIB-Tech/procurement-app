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
  placeholder?: string
  icon?: boolean
} & FormControlProps
export const ValueField = ({ column, name, size, className, placeholder, icon }: ValueFieldProps) => {
  const _props = { size, className, background: 'solid' as InputBackground, name, placeholder, icon };
  const { type } = column;

  switch (type) {
    case ColumnTypeEnum.Number:
      return <NumberColumnField format={column.format} {..._props}/>;
    case ColumnTypeEnum.Boolean:
      return <BooleanField {..._props} />;
    case ColumnTypeEnum.String:
      return <StringField column={column} {..._props}/>;
    case ColumnTypeEnum.Array:
      return <ArrayField {..._props} />
    default:
      return (
        <ModelField
          modelName={type}
          column={column}
          {..._props}
        />
      )
  }
};