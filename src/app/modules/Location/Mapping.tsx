import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';
import { RoleKeyEnum } from '../Role/Model';
import { INVENTORY_NUMBER_ALLOW_UPDATE } from '../Asset/Mapping';


const mapping: ModelMapping<ModelEnum.Location> = {
  modelName: ModelEnum.Location,
  icon: '/ecommerce/ecm008.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    abbreviation: {
      type: ColumnTypeEnum.String,
      length: 3,
      uppercase: true
    },
    services: {
      type: ModelEnum.Service,
      multiple: true
    },
    users: {
      type: ModelEnum.User,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.LocationListing,
      columns: {}
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.LocationDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.LocationDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.LocationCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.LocationUpdate,
      fields: {
        name: true,
        abbreviation: {
          grantedRoles: INVENTORY_NUMBER_ALLOW_UPDATE
        }
      }
    }
  ]
};

export default mapping;
