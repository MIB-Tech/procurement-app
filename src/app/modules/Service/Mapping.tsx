import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { ASSET_MULTIPLE_COLUMN } from '../columns';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.Service> = {
  modelName: ModelEnum.Service,
  icon: '/maps/map008.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    serviceType: {
      type: ModelEnum.ServiceType
    },
    location: {
      type: ModelEnum.Location
    },
    assets: ASSET_MULTIPLE_COLUMN
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.ServiceListing,
      columns: {
        // location: true
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.ServiceDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.ServiceDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.ServiceCreate,
      fields: {
        serviceType: true,
        location: true
      }
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.ServiceUpdate,
      fields: {
        serviceType: true,
        location: true
      }
    }
  ]
};

export default mapping;
