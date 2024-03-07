import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Operation> = {
  modelName: ModelEnum.Operation,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    title: {
      type: ColumnTypeEnum.String
    },
    operationType: {
      type: ColumnTypeEnum.String
    },
    isMenuItem: {
      type: ColumnTypeEnum.Boolean
    },
    suffix: {
      type: ColumnTypeEnum.String,
      readOnly: true
    },
    icon: {
      type: ColumnTypeEnum.String,
      readOnly: true
    },
    resource: {
      type: ModelEnum.Resource
    },
    roles: {
      type: ModelEnum.Role,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {}
    },
    {
      type: ViewEnum.Create,
      fields: {
        title: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        title: true
      }
    }
  ]
};

export default mapping;
