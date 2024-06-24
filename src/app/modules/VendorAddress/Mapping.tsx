import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.VendorAddress> = {
  modelName: ModelEnum.VendorAddress,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    postalCode: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    address: {
      type: ColumnTypeEnum.String,
    },
    cityName: {
      type: ColumnTypeEnum.String,
    },
    isMain: {
      type: ColumnTypeEnum.Boolean,
    },
    vendor: {
      type: ModelEnum.Vendor,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        postalCode: true,
        cityName: true,
        address: true,
        isMain: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        address: true,
        postalCode: true,
        cityName: true,
        isMain: true,
        // vendor: true
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        address: true,
        postalCode: true,
        cityName: true,
        isMain: true,
        // vendor: true
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        address: true,
        postalCode: true,
        cityName: true,
        isMain: true,
      },
    },
  ],
};

export default mapping;
