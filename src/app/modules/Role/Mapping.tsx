import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { string } from "yup";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.Role> = {
  modelName: ModelEnum.Role,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    roleKey: {
      type: ColumnTypeEnum.String,
      validation: {
        uppercase: true,
      },
      schema: string()
        .matches(/[A-Z.]+$/, { message: { id: "VALIDATION.STRING.UPPERCASE" } })
        .test(
          "VALIDATION.STRING.STARTS_WITH",
          { id: "VALIDATION.STRING.STARTS_WITH", params: { value: "ROLE_" } },
          (value) => !!value?.startsWith("ROLE_")
        ),
    },
    operations: {
      type: ModelEnum.Operation,
      multiple: true,
    },
    users: {
      type: ModelEnum.User,
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
      fields: {
        name: true,
        roleKey: true,
        routes: true,
        operations: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        name: true,
        roleKey: true,
        routes: true,
        operations: true,
      },
    },
  ],
};

export default mapping;
