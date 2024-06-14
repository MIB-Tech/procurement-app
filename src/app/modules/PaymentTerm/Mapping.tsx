import { ModelMapping, ViewEnum } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";
import { StringFormat } from "../../../_core/Column/String/StringColumn";
import { NumberFormat } from "../../../_core/Column/Number/NumberColumn";
import moment from "moment/moment";

const mapping: ModelMapping<ModelEnum.PaymentTerm> = {
  modelName: ModelEnum.PaymentTerm,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    amount: {
      type: ColumnTypeEnum.Number,
      format: NumberFormat.Amount,
      title: "AMOUNT_PAYMENT_TERM",
    },
    date: {
      type: ColumnTypeEnum.String,
      format: StringFormat.Date,
    },
    invoice: {
      type: ModelEnum.Invoice,
    },
  },
  views: [
    {
      type: ViewEnum.Listing,
      columns: {
        date: true,
        amount: true,
      },
    },
    {
      type: ViewEnum.Create,
      fields: {
        date: true,
        amount: true,
      },
    },
    {
      type: ViewEnum.Update,
      fields: {
        date: { defaultValue: moment().add(1, "days").format() },
        amount: true,
      },
    },
    {
      type: ViewEnum.Detail,
      columns: {
        date: true,
        amount: true,
      },
    },
  ],
};
export default mapping;
