import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.Category> = {
  modelName: ModelEnum.Category,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    products: {
      type: ModelEnum.Product,
      multiple: true,
    },
    parent: {
      type: ModelEnum.Category,
      nullable: true,
    },
    users: {
      type: ModelEnum.User,
      multiple: true,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        parent: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        name: true,
        parent: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        parent: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        parent: true,
      },
    },
  ],
};

export default mapping;
