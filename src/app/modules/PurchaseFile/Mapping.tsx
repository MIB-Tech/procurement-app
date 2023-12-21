import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";


const mapping: ModelMapping<ModelEnum.PurchaseFile> = {
  modelName: ModelEnum.PurchaseFile,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    consultedAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    description :{
      type:ColumnTypeEnum.String
    },
    validationPath:{
      type:ColumnTypeEnum.String
    },
    purchaseFileNumber: {
      type: ColumnTypeEnum.String
    },
    createdAt:{
      type:ColumnTypeEnum.String,
      format: StringFormat.Datetime
    },
    purchaseFileType: {
      type: ModelEnum.PurchaseFileType
    },
    purchaseFilesProducts:{
      type:ModelEnum.PurchaseFileProduct
    },
    user:{
      type:ModelEnum.User
    }
  }
};

export default mapping;
