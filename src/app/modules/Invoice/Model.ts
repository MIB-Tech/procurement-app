import {AbstractModel, CreateTimestamp} from '../../../_custom/types/types';
import {PurchaseOrderModel} from "../PurchaseOrder";


type Model = {
  invoiceNumber: string
  purchaseOrders: Array<PurchaseOrderModel>
} & AbstractModel & CreateTimestamp

export default Model;