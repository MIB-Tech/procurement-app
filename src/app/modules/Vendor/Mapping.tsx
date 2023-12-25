import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.Vendor> = {
  modelName: ModelEnum.Vendor,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    name: {
      type: ColumnTypeEnum.String
    },
    code: {
      type: ColumnTypeEnum.String
    },
    ice:{
      type:ColumnTypeEnum.String
    },
    productPricing: {
      type: ModelEnum.ProductPricing,
      multiple: true
    },
    contacts: {
      type: ModelEnum.VendorContact,
      multiple: true,
      embeddedForm: true
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        code:true,
        ice:true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        code:true,
        ice:true,
        contacts: true,
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        contacts: true,
      }
    }
  ]
};

export default mapping;
