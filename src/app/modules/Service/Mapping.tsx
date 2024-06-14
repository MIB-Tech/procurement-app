import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.Service> = {
  modelName: ModelEnum.Service,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    blocs: {
      type: ModelEnum.Bloc,
      multiple: true,
    },
    clinic: {
      type: ModelEnum.Clinic,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        clinic: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        clinic: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        clinic: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        name: true,
        clinic: true,
        blocs: true,
      },
    },
  ],
};

export default mapping;
