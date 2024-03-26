import {Model, ModelMapping, ViewEnum} from '../types/ModelMapping'
import {StringFormat} from '../Column/String/StringColumn'
import {useAuth} from './UseAuth'
import {MODEL_MAPPINGS} from '../../app/modules'
import {getRoutePrefix} from '../utils'
import {ColumnTypeEnum} from '../types/types'
import {ModelEnum} from '../../app/modules/types'

export const getSearchableColumns = <M extends ModelEnum>({modelName, ignoreNested}:{modelName: M, ignoreNested?: boolean}) => {
  const {columnDef} = MODEL_MAPPINGS[modelName] as ModelMapping<any>;
  const columNames = Object.keys(columnDef) as Array<keyof Model<M>>;

  return columNames.reduce(
    (columnNames, currentColumnName) => {
      const def = columnDef[currentColumnName];
      if (def.readOnly) return columnNames

      switch (def.type) {
        case ColumnTypeEnum.String:
          switch (def.format) {
            case undefined:
            case StringFormat.Text:
            case StringFormat.Email:
            case StringFormat.PhoneNumber:
            case StringFormat.Link:
            case StringFormat.Qrcode:
              return [
                ...columnNames,
                currentColumnName
              ];
          }
          return columnNames;
        case ColumnTypeEnum.Number:
        case ColumnTypeEnum.Array:
        case ColumnTypeEnum.Boolean:
          return columnNames
        default:
          if ('multiple' in def || ignoreNested) return columnNames
          const nestedSearchableColumns:Array<keyof Model<any> | string> = getSearchableColumns({modelName: def.type, ignoreNested: true})

          return [
            ...columnNames,
            ...nestedSearchableColumns.map(nestedSearchableColumn => `${currentColumnName.toString()}.${nestedSearchableColumn.toString()}`),
          ]
      }
    }, [] as Array<keyof Model<M> | string>)
}

export const useMapping = <M extends ModelEnum>({ modelName }: { modelName: M }) => {
  const { isGranted } = useAuth();
  const modelMapping = MODEL_MAPPINGS[modelName];
  const { columnDef } = modelMapping;
  const columNames = Object.keys(columnDef) as Array<keyof Model<M>>;
  const searchableColumnNames = getSearchableColumns({modelName});
  const searchable = searchableColumnNames.length > 0;
  const detailable = isGranted([{ resourceName: modelName, operationType: ViewEnum.Detail }]);
  const routePrefix = getRoutePrefix(modelName);
  if (modelName === ModelEnum.User) {
    console.log(searchableColumnNames)
  }

  return {
    routePrefix,
    searchable,
    detailable,
    searchableColumnNames,
    columNames,
    ...modelMapping
  };
};


