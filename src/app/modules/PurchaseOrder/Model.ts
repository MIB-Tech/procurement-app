import {AbstractModel, CreateTimestamp} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {VendorModel} from '../Vendor';
import {CurrencyModel} from '../Currency';
import {ReceiptModel} from '../Receipt';
import {ProjectModel} from '../Project';
import {PurchaseOrderCategoryModel} from '../PurchaseOrderCategory';
import {PurchaseOrderAttachmentModel} from "../PurchaseOrderAttachment";


type Model = {
  orderNumber: number
  createdAt:string
  taxIncluded: boolean
  ref?: string
  externalRef?: string
  desiredDeliveryDate: string
  vendor: VendorModel
  currency?: CurrencyModel
  project: ProjectModel
  category: PurchaseOrderCategoryModel
  purchaseOrderProducts: Array<PurchaseOrderProductModel>
  purchaseOrderAttachments: Array<PurchaseOrderAttachmentModel>
  readonly totalExclTax: number
  readonly totalVatTax: number
  readonly totalInclTax: number
  readonly status :boolean
} & AbstractModel & CreateTimestamp

export default Model;