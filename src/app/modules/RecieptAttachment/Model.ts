import { AbstractFileModel } from "../PurchaseNeedAttachment/Model";
import { ReceiptModel } from "../Receipt";

type Model = {
  receipt: ReceiptModel;
} & AbstractFileModel;

export default Model;
