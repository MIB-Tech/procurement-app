import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";


const mapping: ModelMapping<ModelEnum.Receipt> = {
  modelName: ModelEnum.Receipt,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    receiptNumber: {
      type: ColumnTypeEnum.Number
    },
    receivedAt:{
      type:ColumnTypeEnum.String,
      format:StringFormat.Datetime
    },
    externalRef:{
      type:ColumnTypeEnum.Number
    },
    receiptProducts:{
      type:ModelEnum.ReceiptProduct
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
