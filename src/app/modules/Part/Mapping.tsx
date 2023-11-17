import { ModelMapping, ViewEnum } from '../../../_custom/types/ModelMapping';
import React from 'react';
import { ColumnTypeEnum } from '../../../_custom/types/types';
import { ModelEnum } from '../types';


const mapping: ModelMapping<ModelEnum.Part> = {
  modelName: ModelEnum.Part,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    designation: {
      type: ColumnTypeEnum.String
    },
    articleCode: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    quantity: {
      type: ColumnTypeEnum.Number
    }
  },
  views: [
    {
      type: ViewEnum.Listing
    },
    {
      type: ViewEnum.Form
    }
  ]
};

export default mapping;
