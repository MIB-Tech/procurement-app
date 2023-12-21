import {AbstractModel} from '../../../_custom/types/types';
import {ReceiptProductModel} from "../ReceiptProduct";
import {PurchaseOrderProductModel} from "../PurchaseOrderProduct";


type Model = {
  designation: string
  address: string
  status:boolean
  quantity:number
  receiptproducts:Array<ReceiptProductModel>
  purchaseorderproducts:PurchaseOrderProductModel
} & AbstractModel

export default Model;