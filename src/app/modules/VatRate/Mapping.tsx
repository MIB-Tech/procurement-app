import { ModelMapping, ViewEnum } from "../../../_custom/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_custom/types/types";
import { ModelEnum } from "../types";
import { NumberFormat } from "../../../_custom/Column/Number/NumberColumn";

const mapping: ModelMapping<ModelEnum.VatRate> = {
  modelName: ModelEnum.VatRate,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    uid: {
      type: ColumnTypeEnum.String,
    },

    value: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Percent,
      title: "VAT_RATE_VALUE",
      footer: ({ value }) => <></>,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        value: true,
      },
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
