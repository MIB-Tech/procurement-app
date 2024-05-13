import { PurchaseOrderModel } from "../PurchaseOrder";
import { AbstractFileModel } from "../PurchaseNeedAttachment/Model";

type Model = {
  purchaseOrder: PurchaseOrderModel;
} & AbstractFileModel;

export default Model;
