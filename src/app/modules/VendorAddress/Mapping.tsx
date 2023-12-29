import {ModelMapping, ViewEnum} from '../../../_custom/types/ModelMapping';
import {ColumnTypeEnum} from '../../../_custom/types/types';
import {ModelEnum} from '../types';


const mapping: ModelMapping<ModelEnum.VendorAddress> = {
  modelName: ModelEnum.VendorAddress,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number
    },
    uid: {
      type: ColumnTypeEnum.String
    },
    postalCode: {
      type: ColumnTypeEnum.String,
      nullable: true
    },
    address: {
      type: ColumnTypeEnum.String,
    },
    cityName: {
      type: ColumnTypeEnum.String
    },
    isMain: {
      type: ColumnTypeEnum.Boolean
    },
    vendor: {
      type: ModelEnum.Vendor
    }
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        postalCode: true,
        cityName: true,
        address: true,
        isMain: true,
      }
    },
    {
      type: ViewEnum.Create,
      fields: {
        address: true,
        postalCode: true,
        cityName: true,
        isMain: true,
        vendor: true
      }
    },
    {
      type: ViewEnum.Update,
      fields: {
        // name: true,
        address: true,
        postalCode: true,
        cityName: true,
        isMain: true,
        vendor: true
      }
    },
    {
      type: ViewEnum.Detail,
      columns: {
        address: true,
        postalCode: true,
        cityName: true,
        isMain: true
      }
    }
  ]
};

export default mapping;
