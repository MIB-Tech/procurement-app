import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderModel} from "../PurchaseOrder";
import {ReceiptProductModel} from "../ReceiptProduct";


type Model = {
  receiptNumber: number
  receivedAt: string
  externalRef:string
  purchaseOrder:PurchaseOrderModel
  receiptProducts:Array<ReceiptProductModel>
} & AbstractModel

export default Model;