import {
  CreateViewType,
  ModelMapping,
  UpdateViewType,
  ViewEnum,
} from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";
import React from "react";
import { NestedArrayField } from "../../../_custom/Column/Model/Nested/NestedArrayField";

const mapping: ModelMapping<ModelEnum.Budget> = {
  modelName: ModelEnum.Budget,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
    },
    description: {
      type: ColumnTypeEnum.String,
    },
    clinic: {
      type: ModelEnum.Clinic,
    },
    budgetExercise: {
      type: ModelEnum.BudgetExercise,
    },
    productSectionBudgets: {
      type: ModelEnum.ProductSectionBudget,
      multiple: true,
      embeddedForm: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        clinic: true,
        description: true,
        budgetExercise: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        clinic: true,
        description: true,
        budgetExercise: true,
        productSectionBudgets: {
          render: ({ fieldProps }) => (
            <NestedArrayField
              {...fieldProps}
              modelName={ModelEnum.ProductSectionBudget}
              view={
                {
                  type: ViewEnum.Create,
                  fields: {
                    productSection: true,
                    amount: true,
                  },
                } as CreateViewType<ModelEnum.ProductSectionBudget>
              }
            />
          ),
        },
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        clinic: true,
        description: true,
        budgetExercise: true,
        productSectionBudgets: {
          render: ({ fieldProps }) => (
            <NestedArrayField
              {...fieldProps}
              modelName={ModelEnum.ProductSectionBudget}
              view={
                {
                  type: ViewEnum.Update,
                  fields: {
                    productSection: { slotProps: { fields: { sm: 6 } } },
                    amount: { slotProps: { fields: { sm: 6 } } },
                  },
                } as UpdateViewType<ModelEnum.ProductSectionBudget>
              }
            />
          ),
        },
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        clinic: true,
        description: true,
        budgetExercise: true,
        productSectionBudgets: true,
      },
    },
  ],
};
export default mapping;
