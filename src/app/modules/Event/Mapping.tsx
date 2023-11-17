import { ModelMapping, MutationMode, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { RouteKeyEnum } from '../Route/Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';


const mapping: ModelMapping<ModelEnum.Event> = {
  modelName: ModelEnum.Event,
  icon: '/abstract/abs026.svg',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    name: {
      type: ColumnTypeEnum.String
    },
    description: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
      nullable: true
    },
    startAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    endAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime,
      nullable: true
    },
    asset: {
      type: ModelEnum.Asset,
      nullable: true
    },
  },
  views: [
    {
      type: ViewEnum.Calendar,
      routeKey: RouteKeyEnum.EventListing,
      dateFields: [
        {
          startProperty: 'startAt',
          endProperty: 'endAt'
        }
      ]
    },
    {
      type: ViewEnum.Listing,
      columns: {
        startAt: true,
        endAt: true,
        asset: true
      }
    },
    {
      type: ViewEnum.Detail,
      routeKey: RouteKeyEnum.EventDetail
    },
    {
      type: ViewEnum.Delete,
      routeKey: RouteKeyEnum.EventDelete
    },
    {
      type: ViewEnum.Form,
      routeKey: RouteKeyEnum.EventCreate
    },
    {
      type: ViewEnum.Form,
      mode: MutationMode.Put,
      routeKey: RouteKeyEnum.EventUpdate
    }
  ]
};

export default mapping;
