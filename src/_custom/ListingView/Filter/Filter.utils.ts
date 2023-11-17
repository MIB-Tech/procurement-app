import { Filter, PropertyFilterOperator } from './Filter.types';
import { ColumnMapping, Model } from '../../types/ModelMapping';
import { MODEL_MAPPINGS } from '../../../app/modules';
import { SortInput } from '../ListingView.types';
import { camelCaseToPascalCase } from '../../utils';
import { ColumnTypeEnum } from '../../types/types';
import { ModelEnum } from '../../../app/modules/types';


export const getColumnMapping = <M extends ModelEnum>({ modelName, columnName }: { modelName: M, columnName: string | keyof Model<M> }) => {
  if (columnName.toString().includes('.')) {
    const paths = columnName.toString().split('.');
    const [_modelName, _columnName] = paths.slice((paths.length - 2), paths.length) as [string, string];
    const _columnDef = MODEL_MAPPINGS[camelCaseToPascalCase(_modelName) as ModelEnum].columnDef;

    return _columnDef[_columnName as keyof typeof _columnDef];
  }

  return MODEL_MAPPINGS[modelName].columnDef[columnName as keyof Model<M>];
};

export const filterToParams = <M extends ModelEnum>(filter: Filter<M>, prefix: string, modelName: M) => {
  let result: Record<string, string | number> = {};

  if ('filters' in filter) {
    const { operator, filters } = filter;
    if (filters.length === 1) {
      result = {
        ...result,
        ...filterToParams(filters[0], prefix, modelName)
      };
    }

    if (filters.length > 1) {
      result[`${prefix}[operator]`] = operator;
      filters.forEach((_filter, i) => {
        result = {
          ...result,
          ...filterToParams(_filter, `${prefix}[filters][${i}]`, modelName)
        };
      });
    }

    return result;
  }

  const { property, operator, value } = filter;

  let _value = value;

  let def: ColumnMapping<any> = getColumnMapping({ modelName, columnName: property });

  switch (def.type) {
    case ColumnTypeEnum.String:
    case ColumnTypeEnum.Number:
    case ColumnTypeEnum.Boolean:
      break;
    default:
      switch (operator) {
        case PropertyFilterOperator.IsNull:
        case PropertyFilterOperator.IsNotNull:
        case PropertyFilterOperator.IsTrue:
        case PropertyFilterOperator.IsFalse:
          break;
        default:
          _value = value?.id;
      }
  }

  return {
    ...result,
    [`${prefix}[operator]`]: operator,
    [`${prefix}[property]`]: property,
    [`${prefix}[value]`]: _value
  };
};
export const serializeSort = (sort: SortInput<any>) => Object.keys(sort)
.reduce((obj, columnName) => ({ ...obj, [`sort[${columnName}]`]: sort[columnName] }), {});