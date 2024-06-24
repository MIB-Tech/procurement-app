import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import {
  StringFormat,
  StringSelectOption,
} from "../../../_core/Column/String/StringColumn";
import { I18nMessageKey } from "../../../_core/i18n/I18nMessages";
import { InputField } from "../../../_core/Column/String/InputField";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";
import { StringField } from "../../../_core/Column/String/StringField";
import Model from "./Model";

const mapping: ModelMapping<ModelEnum.QueryParam> = {
  modelName: ModelEnum.QueryParam,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    name: {
      type: ColumnTypeEnum.String,
    },
    label: {
      type: ColumnTypeEnum.String,
    },
    paramType: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Select,
      options: [
        { id: ColumnTypeEnum.String },
        { id: ColumnTypeEnum.Number },
        { id: ColumnTypeEnum.Boolean },
        { id: StringFormat.Date },
        { id: StringFormat.Datetime },
        ...Object.values(ModelEnum).map((type) => ({
          id: type,
          label: (
            type.charAt(0) + type.slice(1).replace(/([A-Z])/g, "_$1")
          ).toUpperCase() as I18nMessageKey,
        })),
      ],
    },
    query: {
      type: ModelEnum.Query,
    },
  },
  views: [
    {
      type: ViewEnum.Create,
      fields: {
        label: true,
        name: {
          render: ({ fieldProps }) => (
            <InputField
              {...fieldProps}
              disabled
              size='sm'
            />
          ),
        },
        paramType: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        label: true,
        name: {
          render: ({ fieldProps }) => (
            <InputField
              {...fieldProps}
              disabled
              size='sm'
            />
          ),
        },
        paramType: true,
      },
    },
  ],
};

export default mapping;
