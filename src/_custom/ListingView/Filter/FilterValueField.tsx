import { PropertyFilter } from './Filter.types';
import { InputBackground } from '../../Column/String/InputBase/Input.types';
import { ModelAutocompleteField } from '../../Column/Model/Autocomplete/ModelAutocompleteField';
import React from 'react';
import { ValueField, ValueFieldProps } from '../../Column/ValueField';
import { isValueless } from './FilterToolbar';
import { StringFormat } from '../../Column/String/StringColumn';
import { SelectField } from '../../Column/controls/fields/SelectField/SelectField';
import { useTrans } from '../../components/Trans';
import { I18nMessageKey } from '../../i18n/I18nMessages';
import { ColumnTypeEnum } from '../../types/types';
import { ModelEnum } from '../../../app/modules/types';


export const FilterValueField = <M extends ModelEnum>(props: ValueFieldProps & Pick<PropertyFilter<M>, 'operator'>) => {
  const { name, size, column, className, operator } = props;
  const rest = { size, className, background: 'solid' as InputBackground, name };
  const { trans } = useTrans();

  if (isValueless(operator)) {
    return <></>;
  }

  switch (column.type) {
    case ColumnTypeEnum.Number:
    case ColumnTypeEnum.Boolean:
    case ColumnTypeEnum.Array:
      break;
    case ColumnTypeEnum.String:
      switch (column.format) {
        case StringFormat.Select:
          const { options } = column;
          return (
            <SelectField
              options={options.map(({ id }) => id)}
              getOptionLabel={option => trans({ id: options.find(o => o.id === option)?.label || (option as I18nMessageKey) })}
              getOptionVariant={option => options.find(o => o.id === option)?.color}
              // placeholder="Select option"
              {...rest}
              size='sm'
              className='rounded-0'
            />
          );
        default:
          break;
      }
      break;
    default:
      return (
        <ModelAutocompleteField
          modelName={column.type}
          autoSelect={'autoSelect' in column}
          getParams={column.getAutocompleteParams}
          {...rest}
          size='sm'
          className='rounded-0'
        />
      );
  }

  return (
    <ValueField
      {...props}
      size='sm'
      className='rounded-0'
    />
  );
};