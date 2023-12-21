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
    address:{
      type:ColumnTypeEnum.String
    },
    status:{
      type:ColumnTypeEnum.Boolean
    },
    quantity:{
      type:ColumnTypeEnum.Number
    },
    receiptproducts:{
      type:ModelEnum.ReceiptProduct
    },
    purchaseorderproducts:{
      type:ModelEnum.PurchaseOrderProduct
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
