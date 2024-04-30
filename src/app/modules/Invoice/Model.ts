import {AbstractModel, CreateTimestamp} from '../../../_custom/types/types';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {VendorModel} from '../Vendor';
import {
  PurchaseOrderComponentPrint,
  PurchaseOrderLinePrint,
  PurchaseOrderPrint,
  PurchaseOrderProductPrint,
} from '../PurchaseOrder/Model'


type Model = {
  invoiceNumber: string
  purchaseOrders: Array<PurchaseOrderModel>
  readonly vendor: VendorModel
} & AbstractModel & CreateTimestamp

export type InvoicePrint = {
  bill: string,
  lines: Array<Omit<PurchaseOrderProductPrint, 'netPrice'> & {netPriceExclTax: string, netPriceInclTax: string} | PurchaseOrderComponentPrint>
} & Omit<PurchaseOrderPrint, 'clinic' | 'taxType' | 'lines'>
export default Model;