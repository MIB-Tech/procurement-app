import { AbstractModel } from "../../../_core/types/types";
import { PurchaseOrderModel } from "../PurchaseOrder";

type Model = {
  name: string;
  purchaseOrders: Array<PurchaseOrderModel>;
} & AbstractModel;

export default Model;
