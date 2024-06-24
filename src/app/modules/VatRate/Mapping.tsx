import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";

const mapping: ModelMapping<ModelEnum.VatRate> = {
  modelName: ModelEnum.VatRate,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
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
