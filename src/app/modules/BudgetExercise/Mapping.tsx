import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_core/Column/String/StringColumn";

const mapping: ModelMapping<ModelEnum.BudgetExercise> = {
  modelName: ModelEnum.BudgetExercise,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    code: {
      type: ColumnTypeEnum.String,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    startAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
    },
    endAt: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
    },
    budget: {
      type: ModelEnum.Budget,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        name: true,
        code: true,
        budget: true,
        startAt: true,
        endAt: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        code: true,
        startAt: true,
        endAt: true,
        //  budget:true
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        code: true,
        startAt: true,
        endAt: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {},
    },
  ],
};
export default mapping;
