import {ModelMapping} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';
import {StringFormat} from "../../../_custom/Column/String/StringColumn";


const mapping: ModelMapping<ModelEnum.VendorOffer> = {
  modelName: ModelEnum.VendorOffer,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    status: {
      type: ColumnTypeEnum.Boolean,
    },
    receiveAt :{
      type:ColumnTypeEnum.String,
      format:StringFormat.Datetime
    },
    devisDate:{
      type:ColumnTypeEnum.String,
      format:StringFormat.Date
    },
    isVATIncluded: {
      type: ColumnTypeEnum.Boolean
    },
    devisNumber:{
      type:ColumnTypeEnum.Number,
    },
    note: {
      type: ColumnTypeEnum.String
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
    vendorOfferProducts: {
      type: ModelEnum.VendorOffer,
      multiple: true
    }
  }
};

export default mapping;
