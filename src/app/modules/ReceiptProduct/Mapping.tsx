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
    designation: {
      type: ColumnTypeEnum.String
    },
    address:{
      type:ColumnTypeEnum.String
    },
    quantity:{
      type:ColumnTypeEnum.Number
    },
    receipts:{
      type:ModelEnum.Receipt
    },
    desiredProducts:{
      type:ModelEnum.DesiredProduct
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
