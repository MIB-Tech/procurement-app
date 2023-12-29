import {AbstractModel} from '../../../_custom/types/types';
import {ReceiptProductModel} from '../ReceiptProduct';
import {VendorModel} from '../Vendor';
import {PurchaseOrderModel} from '../PurchaseOrder';


type Model = {
  receiptNumber: number
  receivedAt: string
  externalRef: string
  receiptProducts: Array<ReceiptProductModel>
  readonly vendor: VendorModel
  readonly purchaseOrders: Array<PurchaseOrderModel>
} & AbstractModel

export default Model;