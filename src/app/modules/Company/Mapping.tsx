import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.Company> = {
  modelName: ModelEnum.Company,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    code: {
      type: ColumnTypeEnum.String,
      validation: {
        uppercase: true,
      },
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
        code: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        code: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        code: true,
      },
    },
  ],
};

export default mapping;
