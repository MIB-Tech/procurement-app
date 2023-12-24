import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from "../PurchaseOrderProduct";
import {VendorModel} from "../Vendor";
import {CurrencyModel} from "../Currency";
import {ReceiptModel} from "../Receipt";
import {ProjectModel} from "../Project";
import {PurchaseOrderCategoryModel} from "../PurchaseOrderCategory";


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
  projects:ProjectModel
  purchaseOrderCategory:Array<PurchaseOrderCategoryModel>
} & AbstractModel

export default Model;