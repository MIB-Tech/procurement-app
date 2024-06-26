import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.Component> = {
  modelName: ModelEnum.Component,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      validation: {
        positive: true,
      },
    },
    parentProduct: {
      type: ModelEnum.Product,
      title: "PRODUCT",
    },
    product: {
      type: ModelEnum.Product,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        quantity: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        product: true,
        quantity: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        product: true,
        quantity: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        product: true,
      },
    },
  ],
};

export default mapping;
