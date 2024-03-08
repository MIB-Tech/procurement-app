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
      type: ColumnTypeEnum.Boolean,
      nullable: true
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
        title: {slotProps: {root: {sm: 4}}},
        operationType: true,
        resource: true,
        isMenuItem: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        title: {slotProps: {root: {sm: 4}}},
        operationType: {slotProps: {root: {sm: 4}}},
        resource: {slotProps: {root: {sm: 4}}},
        isMenuItem: true
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        title: true,
        operationType: true,
        roles: true,
        resource: true,
        isMenuItem: true
      }
    }
  ]
};

export default mapping;
