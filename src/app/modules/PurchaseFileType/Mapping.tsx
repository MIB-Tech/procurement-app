import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.PurchaseFileType> = {
  modelName: ModelEnum.PurchaseFileType,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    purchaseFiles: {
      type: ModelEnum.PurchaseFile,
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
