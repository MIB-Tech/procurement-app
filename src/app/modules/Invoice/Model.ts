import {AbstractModel, CreateTimestamp} from '../../../_custom/types/types';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {VendorModel} from '../Vendor';
import {PurchaseOrderPrint} from '../PurchaseOrder/Model';


type Model = {
  invoiceNumber: string
  purchaseOrders: Array<PurchaseOrderModel>
  readonly vendor: VendorModel
} & AbstractModel & CreateTimestamp

export type InvoicePrint = {
  bill: string,
} & PurchaseOrderPrint

export default Model;