import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.Currency> = {
  modelName: ModelEnum.Currency,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    code: {
      type: ColumnTypeEnum.String,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {},
      filterColumns: {},
      sortColumns: {
        code: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        code: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        code: true,
      },
    },
  ],
};

export default mapping;
