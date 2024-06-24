import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.DeliveryDepot> = {
  modelName: ModelEnum.DeliveryDepot,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    address: {
      type: ColumnTypeEnum.String,
    },
    clinic: {
      type: ModelEnum.Clinic,
    },
    desiredProducts: {
      type: ModelEnum.DesiredProduct,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        clinic: true,
        address: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        address: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        address: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        clinic: true,
        address: true,
      },
    },
  ],
};
export default mapping;
