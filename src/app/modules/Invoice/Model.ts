import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderModel} from "../PurchaseOrder";


type Model = {
  invoiceNumber: string
  createdAt: string
  purchaseOrders: Array<PurchaseOrderModel>
} & AbstractModel

export default Model;