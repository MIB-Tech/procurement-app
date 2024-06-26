import {
  FormFields,
  ModelMapping,
  ViewEnum,
} from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_core/Column/String/StringColumn";
import { Audits } from "./Views/Audits";
import { HydraItem } from "../../../_core/types/hydra.types";

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
      defaultState: {
        sort: {
          sortIndex: "desc",
        },
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
        audits: {
          as: "TAB",
          render: ({ item }) => (
            <Audits modelName={(item as HydraItem)["@title"] as ModelEnum} />
          ),
        },
      },
    },
  ],
};
export default mapping;
