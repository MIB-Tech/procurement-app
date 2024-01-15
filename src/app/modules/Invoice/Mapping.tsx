import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";


const mapping: ModelMapping<ModelEnum.Invoice> = {
  modelName: ModelEnum.Invoice,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    invoiceNumber: {
      type: ColumnTypeEnum.String
    },
    createdAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        purchaseOrders: true,
        createdAt: true
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        purchaseOrders: true
      }
    },
    {
      type:ViewEnum.Detail,
      columns:{
        invoiceNumber:true,
        createdAt: true,
        purchaseOrders: true
      }
    }
  ]

};

export default mapping;
