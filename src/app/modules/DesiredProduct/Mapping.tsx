import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.DesiredProduct> = {
  modelName: ModelEnum.DesiredProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    designation: {
      type: ColumnTypeEnum.String
    },
    address: {
      type: ColumnTypeEnum.String
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      title: 'RECEIVED_QUANTITY'
    },
    status: {
      type: ColumnTypeEnum.Boolean
    },
    purchaseOrderProduct: {
      type: ModelEnum.PurchaseOrderProduct
    },
    receiptProduct: {
      type: ModelEnum.ReceiptProduct
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        address: true,
        quantity: true,
      }
    }
  ]
};

export default mapping;
