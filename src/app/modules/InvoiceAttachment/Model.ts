import { AbstractFileModel } from "../PurchaseNeedAttachment/Model";
import { InvoiceModel } from "../Invoice";

type Model = {
  invoice: InvoiceModel;
} & AbstractFileModel;

export default Model;
