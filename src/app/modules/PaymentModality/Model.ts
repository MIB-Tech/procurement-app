import { AbstractModel } from "../../../_core/types/types";
import { VendorModel } from "../Vendor";
import { PurchaseOrderModel } from "../PurchaseOrder";

type Model = {
  name: string;
  vendors: Array<VendorModel>;
  PurchaseOrders: Array<PurchaseOrderModel>;
} & AbstractModel;

export default Model;
