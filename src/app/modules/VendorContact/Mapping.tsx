import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {StringFormat} from '../../../_custom/Column/String/StringColumn';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.VendorContact> = {
  modelName: ModelEnum.VendorContact,
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
    email: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Email,
      nullable: true
    },
    phoneNumber: {
      type: ColumnTypeEnum.String,
      format: StringFormat.PhoneNumber
    },
    address: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    vendor: {
      type: ModelEnum.Vendor
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        name: true,
        email: true,
        phoneNumber: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        phoneNumber: true,
        email: true,
        address: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        phoneNumber: true,
        email: true,
        address: true
      }
    }
  ]
};

export default mapping;
