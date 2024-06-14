import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.Bloc> = {
  modelName: ModelEnum.Bloc,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    floor: {
      type: ColumnTypeEnum.Number,
    },
    service: {
      type: ModelEnum.Service,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        service: true,
        floor: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        service: true,
        floor: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        service: true,
        floor: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        name: true,
        floor: true,
        service: true,
      },
    },
  ],
};

export default mapping;
