import {
  FormFields,
  ModelMapping,
  ViewEnum,
} from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_custom/Column/String/StringColumn";

const formFields: FormFields<ModelEnum.Resource> = {
  name: {
    slotProps: {
      root: { sm: 4 },
    },
  },
  sortIndex: {
    slotProps: {
      root: { sm: 4 },
    },
  },
  icon: {
    slotProps: {
      root: { sm: 4 },
    },
  },
  operations: true,
};
const mapping: ModelMapping<ModelEnum.Resource> = {
  modelName: ModelEnum.Resource,
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
    icon: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Icon,
      nullable: true,
    },
    sortIndex: {
      type: ColumnTypeEnum.Number,
      nullable: true,
    },
    operations: {
      type: ModelEnum.Operation,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        icon: true,
        sortIndex: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: formFields,
    },
    {
      type: ViewEnum.Update,
      fields: formFields,
    },
    {
      type: ViewEnum.Detail,
      columns: {
        icon: true,
        operations: true,
        sortIndex: true,
      },
    },
  ],
};
export default mapping;
