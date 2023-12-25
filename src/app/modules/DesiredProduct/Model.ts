import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {ReceiptProductModel} from '../ReceiptProduct';


type Model = {
  designation: string
  address: string
  quantity: number
  readonly status:boolean
  receiptProduct?: ReceiptProductModel
  purchaseOrderProduct: PurchaseOrderProductModel
} & AbstractModel

export default Model;