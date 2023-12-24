import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Project> = {
  modelName: ModelEnum.Project,
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
    purchaseNeeds: {
      type: ModelEnum.PurchaseNeed,
      multiple: true
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    }
  }
};

export default mapping;
