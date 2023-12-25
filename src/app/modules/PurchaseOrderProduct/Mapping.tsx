import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.PurchaseOrderProduct> = {
  modelName: ModelEnum.PurchaseOrderProduct,
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
    quantity:{
      type:ColumnTypeEnum.Number
    },
    grossPrice: {
      type: ColumnTypeEnum.Number
    },
    note: {
      type: ColumnTypeEnum.String,
    },
    vatRate:{
      type:ColumnTypeEnum.Number
    },
    discountType:{
      type:ColumnTypeEnum.String
    },
    discountValue:{
      type:ColumnTypeEnum.Number
    },
    product:{
      type:ModelEnum.Product
    },
    user:{
      type:ModelEnum.User
    },
    desiredProduct:{
      type:ModelEnum.DesiredProduct
    },
    discount:{
      type:ModelEnum.Discount
    },
    purchaseOrder:{
      type:ModelEnum.PurchaseOrder
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        designation:true,
        quantity:true,
        discountType:true,
        discountValue:true,

      }
    }

  ]
};

export default mapping;
