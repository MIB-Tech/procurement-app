import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.PurchaseFileType> = {
  modelName: ModelEnum.PurchaseFileType,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    name: {
      type: ColumnTypeEnum.String
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {}
    }
  ]
};

export default mapping;
