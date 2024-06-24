import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.PurchaseOrderCategory> = {
  modelName: ModelEnum.PurchaseOrderCategory,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
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
