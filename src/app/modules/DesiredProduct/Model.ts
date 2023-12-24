import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {ReceiptProductModel} from '../ReceiptProduct';


type Model = {
  designation: string
  address: string
  quantity: number
  receiptProduct?: ReceiptProductModel
  purchaseOrderProduct: PurchaseOrderProductModel
} & AbstractModel

export default Model;