import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.ValidationPath> = {
  modelName: ModelEnum.ValidationPath,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    steps: {
      type: ModelEnum.Step,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {},
    },
  ],
};

export default mapping;
