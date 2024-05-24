import { ModelMapping, ViewEnum } from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.PurchaseFileType> = {
  modelName: ModelEnum.PurchaseFileType,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
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
