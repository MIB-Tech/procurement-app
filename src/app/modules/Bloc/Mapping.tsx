import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Bloc> = {
  modelName: ModelEnum.Bloc,
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
    floor: {
      type: ColumnTypeEnum.Number
    },
    service: {
      type: ModelEnum.Service
    }
  }
};

export default mapping;
