import { ModelMapping, ViewEnum } from "../../_core/types/ModelMapping";
import { ModelEnum } from "../modules/types";
import { ColumnTypeEnum } from "../../_core/types/types";

const mapping: ModelMapping<ModelEnum.Accounting> = {
  modelName: ModelEnum.Accounting,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    invoice: {
      type: ModelEnum.Invoice,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {},
    },
    {
      type: ViewEnum.Create,
      fields: {},
    },
    {
      type: ViewEnum.Update,
      fields: {},
    },
    {
      type: ViewEnum.Detail,
      columns: {},
    },
  ],
};

export default mapping;
