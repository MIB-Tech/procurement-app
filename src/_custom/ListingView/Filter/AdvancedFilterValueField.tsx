import { PropertyFilter } from './Filter.types';
import { InputBackground } from '../../Column/String/InputBase/Input.types';
import { ModelAutocompleteField } from '../../Column/Model/Autocomplete/ModelAutocompleteField';
import React from 'react';
import { ValueField, ValueFieldProps } from '../../Column/ValueField';
import { StringFormat } from '../../Column/String/StringColumn';
import { SelectField } from '../../Column/controls/fields/SelectField/SelectField';
import { useTrans } from '../../components/Trans';
import { I18nMessageKey } from '../../i18n/I18nMessages';
import { ColumnTypeEnum } from '../../types/types';
import { ModelEnum } from '../../../app/modules/types';
import { StringField } from '../../Column/String/StringField';
import { isValueless } from './Filter.utils';


export const AdvancedFilterValueField = <M extends ModelEnum>(props: ValueFieldProps & Pick<PropertyFilter<M>, 'operator'>) => {
  const { name, size = 'sm', column, className, operator, placeholder } = props;
  const rest = { size, className, background: 'solid' as InputBackground, name, placeholder };
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
        case StringFormat.Text:
          return (
            <StringField
              column={{
                ...column,
                format: undefined
              }}
              {...rest}
            />
          );
        case StringFormat.Select:
          const { options } = column;
          return (
            <SelectField
              options={options.map(({ id }) => id)}
              getOptionLabel={option => trans({ id: options.find(o => o.id === option)?.label || (option as I18nMessageKey) })}
              getOptionVariant={option => options.find(o => o.id === option)?.color}
              {...rest}
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
        />
      );
  }

  return (
    <ValueField
      {...props}
      {...rest}
    />
  );
};