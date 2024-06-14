import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";

const mapping: ModelMapping<ModelEnum.ProductSectionBudget> = {
  modelName: ModelEnum.ProductSectionBudget,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    amount: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      title: "AMOUNT_PRODUCT_SECTION",
    },
    budget: {
      type: ModelEnum.Budget,
      nullable: true,
    },
    productSection: {
      type: ModelEnum.ProductSection,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      filterColumns: {
        "budget.budgetExercise": true,
      },
      columns: {
        budget: true,
        productSection: true,
        amount: true,
      },
    },
  ],
};
export default mapping;
