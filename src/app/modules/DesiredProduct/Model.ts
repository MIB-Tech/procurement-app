import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {ReceiptProductModel} from '../ReceiptProduct';
import {QuantityStatusEnum} from '../PurchaseOrder/Model';


type Model = {
  designation: string
  address: string
  quantity: number
  receiptProduct?: ReceiptProductModel
  purchaseOrderProduct: PurchaseOrderProductModel
  readonly status: QuantityStatusEnum
} & AbstractModel

export default Model;