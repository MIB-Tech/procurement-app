import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.ReceiptProduct> = {
  modelName: ModelEnum.ReceiptProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    quantity:{
      type:ColumnTypeEnum.Number
    },
    desiredProductQuantity:{
      type:ColumnTypeEnum.Number
    },
    note:{
      type:ColumnTypeEnum.String
    },
    receipt:{
      type:ModelEnum.Receipt
    },
    desiredProduct:{
      type:ModelEnum.DesiredProduct
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {}
    },
    {
      type: ViewEnum.Create,
      fields: {
        desiredProductQuantity: {
          render: ({item}) => {

            return item.desiredProduct.quantity
          }
        },
        quantity: true,
        note: true,
      }
    }
  ]
};

export default mapping;
