import { Model, ViewEnum } from '../types/ModelMapping';
import { StringFormat } from '../Column/String/StringColumn';
import { useAuth } from './UseAuth';
import { MODEL_MAPPINGS } from '../../app/modules';
import { getRoutePrefix } from '../utils';
import React from 'react';
import { ColumnTypeEnum } from '../types/types';
import { ModelEnum } from '../../app/modules/types';


export const useMapping = <M extends ModelEnum>({ modelName }: { modelName: M }) => {
  const { isRouteGranted } = useAuth();
  const modelMapping = MODEL_MAPPINGS[modelName];
  const { columnDef, views } = modelMapping;
  const columNames = Object.keys(columnDef) as Array<keyof Model<M>>;
  const searchableColumnNames = columNames.filter(columnName => {
    const def = columnDef[columnName];
    switch (def.type) {
      case ColumnTypeEnum.String:
        switch (def.format) {
          case undefined:
          case StringFormat.Text:
          case StringFormat.Email:
          case StringFormat.PhoneNumber:
          case StringFormat.Link:
          case StringFormat.Qrcode:
            return true;
        }
        return false;
      case ColumnTypeEnum.Number:
      case ColumnTypeEnum.Array:
      case ColumnTypeEnum.Boolean:
      default:
        return false;
    }
  });
  const searchable = searchableColumnNames.length > 0;
  const detailRouteKey = views?.find(view => view.type === ViewEnum.Detail)?.routeKey;
  const detailable = detailRouteKey && isRouteGranted([detailRouteKey]);
  const routePrefix = getRoutePrefix(modelName);

  return {
    routePrefix,
    searchable,
    detailable,
    searchableColumnNames,
    columNames,
    ...modelMapping
  };
};


