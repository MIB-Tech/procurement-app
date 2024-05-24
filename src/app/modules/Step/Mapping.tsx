import { ModelMapping, ViewEnum } from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_custom/Column/String/StringColumn";

const mapping: ModelMapping<ModelEnum.Step> = {
  modelName: ModelEnum.Step,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    strategy: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: [{ id: "OR" }, { id: "AND" }],
    },
    sortIndex: {
      type: ColumnTypeEnum.Number,
    },
    users: {
      type: ModelEnum.User,
      multiple: true,
    },
    validationPath: {
      type: ModelEnum.ValidationPath,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {},
    },
    {
      type: ViewEnum.Detail,
    },
    {
      type: ViewEnum.Delete,
    },
    {
      type: ViewEnum.Create,
    },
    {
      type: ViewEnum.Update,
    },
  ],
};

export default mapping;
