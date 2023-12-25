import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.purchaseOrderAttachment> = {
  modelName: ModelEnum.purchaseOrderAttachment,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    fileName: {
      type: ColumnTypeEnum.String
    },
    purchaseOrder: {
      type: ModelEnum.PurchaseOrder
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        name: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
      }
    }
  ]
};

export default mapping;
