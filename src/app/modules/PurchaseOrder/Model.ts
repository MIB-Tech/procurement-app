import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from "../PurchaseOrderProduct";
import {VendorModel} from "../Vendor";
import {CurrencyModel} from "../Currency";
import {ReceiptModel} from "../Receipt";


type Model = {
  orderNumber: number
  createdAt: string
  isTaxIncluded: boolean
  ref:string
  externalRef:string
  desiredDeliveryDate:string
  purchaseOrderProducts:Array<PurchaseOrderProductModel>
  vendor:VendorModel
  currency:CurrencyModel
  receipts:Array<ReceiptModel>

} & AbstractModel

export default Model;