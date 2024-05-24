import { ModelMapping, ViewEnum } from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.PurchaseOrderCategory> = {
  modelName: ModelEnum.PurchaseOrderCategory,
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
    purchaseOrders: {
      type: ModelEnum.PurchaseOrder,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        name: true,
        PurchaseOrders: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        PurchaseOrders: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        PurchaseOrders: true,
      },
    },
  ],
};

export default mapping;
