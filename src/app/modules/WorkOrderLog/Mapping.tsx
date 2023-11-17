import { ModelMapping, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { StringFormat } from '../../../_custom/Column/String/StringColumn';
import { LogActionEnum } from './Model';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.WorkOrderLog> = {
  modelName: ModelEnum.WorkOrderLog,
  icon: '',
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    data: {
      type: ColumnTypeEnum.Array
    },
    oldData: {
      type: ColumnTypeEnum.Array
    },
    action: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: [
        { id: LogActionEnum.Create, color: 'primary' },
        { id: LogActionEnum.Update, color: 'info' }
      ]
    },
    username: {
      type: ColumnTypeEnum.String
    },
    loggedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    objectClass: {
      type: ColumnTypeEnum.String
    },
    objectId: {
      type: ColumnTypeEnum.String
    },
    version: {
      type: ColumnTypeEnum.String
    }
  },
  views: [
    {
      type: ViewEnum.Listing
    }
  ]
};

export default mapping;
