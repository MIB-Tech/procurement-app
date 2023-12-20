import {ModelMapping} from '../../../_custom/types/ModelMapping';
import React from 'react';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Resource> = {
  modelName: ModelEnum.Resource,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    name: {
      type: ColumnTypeEnum.String
    },
    icon: {
      type: ColumnTypeEnum.String
    },
    sortIndex: {
      type: ColumnTypeEnum.Number
    },
    operations: {
      type: ModelEnum.Operation,
      multiple: true
    }
  }
};

export default mapping;
