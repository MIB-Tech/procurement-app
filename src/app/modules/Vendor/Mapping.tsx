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
    ice: {
      type: ColumnTypeEnum.String
    },
    email: {
      type: ColumnTypeEnum.String
    },
    phoneNumber: {
      type: ColumnTypeEnum.String
    },
    secondaryPhoneNumber: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    defaultAddress: {
      type: ModelEnum.VendorAddress
    },
    productPricing: {
      type: ModelEnum.ProductPricing,
      multiple: true
    },
    addresses: {
      type: ModelEnum.VendorAddress,
      multiple: true,
      embeddedForm: true
    },
    paymentModality: {
      type: ModelEnum.PaymentModality,
      nullable: true,
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        code: true,
        ice: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        code: true,
        ice: true,
        email: true,
        phoneNumber: true,
        secondaryPhoneNumber: true,
        paymentModality: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        code: true,
        ice: true,
        email: true,
        phoneNumber: true,
        secondaryPhoneNumber: true,
        paymentModality: true
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        addresses: true,
        name: true,
        code: true,
        ice: true,
        email: true,
        phoneNumber: true,
        secondaryPhoneNumber: true,
        productPricing: true,
        paymentModality: true
      }
    }
  ]
};

export default mapping;
