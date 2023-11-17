import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.Team> = {
  modelName: ModelEnum.Team,
  icon: '/abstract/abs026.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    users: {
      type: ModelEnum.User,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      routeKey: RouteKeyEnum.TeamListing,
      columns: {}
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.TeamDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.TeamDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.TeamCreate,
      fields: {
        name: true,
        users: true
      }
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.TeamUpdate,
      fields: {
        name: true,
        users: true
      }
    }
  ]
};

export default mapping;
