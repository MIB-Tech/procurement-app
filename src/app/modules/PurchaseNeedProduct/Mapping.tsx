import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.PurchaseNeedProduct> = {
  modelName: ModelEnum.PurchaseNeedProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    quantity: {
      type: ColumnTypeEnum.Number,
    },
    product: {
      type: ModelEnum.Product,
    },
    order: {
      type: ModelEnum.PurchaseNeed,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {},
    },
    {
      type: ViewEnum.Create,
      fields: {
        product: true,
        quantity: {
          defaultValue: 1,
        },
      },
    },
  ],
};

export default mapping;
