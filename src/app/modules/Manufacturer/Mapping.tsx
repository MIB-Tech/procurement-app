import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.Manufacturer> = {
  modelName: ModelEnum.Manufacturer,
  icon: '/abstract/abs043.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    assetModels: {
      type: ModelEnum.AssetModel,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.ManufacturerListing,
      columns: {}
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.ManufacturerDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.ManufacturerDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.ManufacturerCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.ManufacturerUpdate
    }
  ]
};

export default mapping;
