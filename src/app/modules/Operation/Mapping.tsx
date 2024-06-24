import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { OPERATIONS_TYPE_OPTIONS } from "./Model";
import { StringFormat } from "../../../_core/Column/String/StringColumn";

const mapping: ModelMapping<ModelEnum.Operation> = {
  modelName: ModelEnum.Operation,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    title: {
      type: ColumnTypeEnum.String,
    },
    operationType: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: OPERATIONS_TYPE_OPTIONS,
    },
    isMenuItem: {
      type: ColumnTypeEnum.Boolean,
      nullable: true,
    },
    suffix: {
      type: ColumnTypeEnum.String,
      readOnly: true,
    },
    icon: {
      type: ColumnTypeEnum.String,
      readOnly: true,
    },
    resource: {
      type: ModelEnum.Resource,
    },
    roles: {
      type: ModelEnum.Role,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {},
    },
    {
      type: ViewEnum.Create,
      slotProps: { item: { sm: 4 } },
      fields: {
        title: true,
        operationType: true,
        resource: true,
        isMenuItem: true,
      },
    },
    {
      type: ViewEnum.Update,
      slotProps: { item: { sm: 4 } },
      fields: {
        title: true,
        operationType: true,
        resource: true,
        isMenuItem: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        title: true,
        operationType: true,
        roles: true,
        resource: true,
        isMenuItem: true,
      },
    },
  ],
};

export default mapping;
