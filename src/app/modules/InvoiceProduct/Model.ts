import { AbstractModel } from "../../../_core/types/types";
import { InvoiceModel } from "../Invoice";
import { ReceiptProductModel } from "../ReceiptProduct";

type Model = {
  quantity: number;
  note: string;
  receiptProduct: ReceiptProductModel;
  invoice: InvoiceModel;
} & AbstractModel;

export default Model;
