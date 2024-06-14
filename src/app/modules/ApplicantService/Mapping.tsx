import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.ApplicantService> = {
  modelName: ModelEnum.ApplicantService,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    purchaseNeeds: {
      type: ModelEnum.PurchaseNeed,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        name: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
      },
    },
  ],
};

export default mapping;
