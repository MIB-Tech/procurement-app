import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";


const mapping: ModelMapping<ModelEnum.PurchaseOrder> = {
  modelName: ModelEnum.PurchaseOrder,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    orderNumber: {
      type: ColumnTypeEnum.Number
    },
    createdAt:{
      type:ColumnTypeEnum.String,
      format:StringFormat.Datetime
    },
    isTaxIncluded: {
      type: ColumnTypeEnum.Number
    },
    ref: {
      type: ColumnTypeEnum.String,
    },
    externalRef:{
      type:ColumnTypeEnum.String
    },
    desiredDeliveryDate:{
      type:ColumnTypeEnum.String,
      format:StringFormat.Date
    },
    currency:{
      type:ModelEnum.Currency
    },
    purchaseOrderProducts:{
      type:ModelEnum.PurchaseOrderProduct
    },
    receipts:{
      type:ModelEnum.Receipt
    },
    vendor:{
      type:ModelEnum.Vendor
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
