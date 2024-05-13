import { AbstractModel } from "../../../_custom/types/types";
import { PurchaseOrderModel } from "../PurchaseOrder";

type Model = {
  name: string;
  purchaseOrders: Array<PurchaseOrderModel>;
} & AbstractModel;

export default Model;
