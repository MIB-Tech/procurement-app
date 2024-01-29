import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.ReceiptProductComponent> = {
  modelName: ModelEnum.ReceiptProductComponent,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      validation: {
        positive: true
      }
    },
    receiptProduct: {
      type: ModelEnum.ReceiptProduct
    },
    purchaseOrderProductComponent: {
      type: ModelEnum.PurchaseOrderProductComponent
    },
  },
};

export default mapping;
