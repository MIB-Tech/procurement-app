import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.PurchaseFileProduct> = {
  modelName: ModelEnum.PurchaseFileProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
   code:{
      type:ColumnTypeEnum.String
   },
    designation:{
      type:ColumnTypeEnum.String
    },
    orderedQuantity:{
      type:ColumnTypeEnum.Number
    },
    validateQuantity:{
      type:ColumnTypeEnum.Number
    },
    partNumber:{
      type:ColumnTypeEnum.Number
    },
    devisNumber:{
      type:ColumnTypeEnum.Number
    },
    recommendedPrice:{
      type:ColumnTypeEnum.Number
    },
    purchaseFile:{
      type:ModelEnum.PurchaseFile
    },
    vendorOffer:{
      type:ModelEnum.VendorOffer
    }






  }
};

export default mapping;
