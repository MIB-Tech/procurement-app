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
      columns: {}
    },
    {
      type: ViewEnum.Create,
      fields: {
        fileName: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        fileName: true
      }
    }
  ]
};

export default mapping;
