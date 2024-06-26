import { ModelMapping } from "../../../_core/types/ModelMapping";
import { ColumnTypeEnum } from "../../../_core/types/types";
import { ModelEnum } from "../types";

const mapping: ModelMapping<ModelEnum.InvoiceProduct> = {
  modelName: ModelEnum.InvoiceProduct,
  columnDef: {
    id: {
      type: ColumnTypeEnum.Number,
    },
    quantity: {
      type: ColumnTypeEnum.Number,
      validation: {
        positive: true,
      },
    },
    note: {
      type: ColumnTypeEnum.String,
      nullable: true,
    },
    invoice: {
      type: ModelEnum.Invoice,
    },
    receiptProduct: {
      type: ModelEnum.ReceiptProduct,
    },
  },
};
export default mapping;
