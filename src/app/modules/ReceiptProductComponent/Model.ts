import { AbstractModel } from "../../../_core/types/types";
import { ReceiptProductModel } from "../ReceiptProduct";
import { PurchaseOrderProductComponentModel } from "../PurchaseOrderProductComponent";

type Model = {
  quantity: number;
  receiptProduct: ReceiptProductModel;
  purchaseOrderProductComponent: PurchaseOrderProductComponentModel;
  readonly restQuantity: number;
  readonly received: number;
} & AbstractModel;

export default Model;
