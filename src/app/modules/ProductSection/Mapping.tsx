import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.ProductSection> = {
  modelName: ModelEnum.ProductSection,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    rupture: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    code: {
      type: ColumnTypeEnum.String,
    },
    sortIndex: {
      type: ColumnTypeEnum.Number,
    },
    products: {
      type: ModelEnum.Product,
      multiple: true,
    },
    productSectionsBudgets: {
      type: ModelEnum.ProductSectionBudget,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        code: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        code: true,
        name: true,
        sortIndex: true,
        rupture: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        code: true,
        name: true,
        sortIndex: true,
        rupture: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        name: { render: (props) => props.item.name.toUpperCase() },
        sortIndex: true,
        rupture: true,
        products: true,
        productSectionsBudgets: true,
      },
    },
  ],
};

export default mapping;
