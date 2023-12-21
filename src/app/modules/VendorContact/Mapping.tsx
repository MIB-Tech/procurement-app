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
      format: StringFormat.Email
    },
    phoneNumber: {
      type: ColumnTypeEnum.String,
      format: StringFormat.PhoneNumber
    },
    address: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Text,
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
        email: true,
        phoneNumber: true,
      }
    }
  ]
};

export default mapping;
