import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';

const mapping: ModelMapping<ModelEnum.ServiceType> = {
  modelName: ModelEnum.ServiceType,
  icon: '/abstract/abs026.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    services: {
      type: ModelEnum.Service,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.ServiceTypeListing,
      columns: {}
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.ServiceTypeDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.ServiceTypeDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.ServiceTypeCreate,
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.ServiceTypeUpdate
    }
  ]
};

export default mapping;