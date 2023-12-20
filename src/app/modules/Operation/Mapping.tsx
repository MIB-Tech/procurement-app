import {ModelMapping} from '../../../_custom/types/ModelMapping';
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
      type: ColumnTypeEnum.String
    },
    icon: {
      type: ColumnTypeEnum.String
    },
    resource: {
      type: ModelEnum.Resource
    },
    roles: {
      type: ModelEnum.Role,
      multiple: true
    }
  }
};

export default mapping;
