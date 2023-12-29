import {AbstractModel, CreateTimestamp} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {VendorModel} from '../Vendor';
import {CurrencyModel} from '../Currency';
import {ProjectModel} from '../Project';
import {PurchaseOrderCategoryModel} from '../PurchaseOrderCategory';
import {PurchaseOrderAttachmentModel} from '../PurchaseOrderAttachment';
import {StringSelectOption} from '../../../_custom/Column/String/StringColumn';

export enum QuantityStatusEnum {
  Unreceived = 'UNRECEIVED',
  PartiallyReceived = 'PARTIALLY_RECEIVED',
  FullyReceived = 'FULLY_RECEIVED',
}

export const QUANTITY_STATUS_OPTIONS: Array<StringSelectOption> = [
  {id: QuantityStatusEnum.Unreceived, color: 'warning'},
  {id: QuantityStatusEnum.PartiallyReceived, color: 'primary'},
  {id: QuantityStatusEnum.FullyReceived, color: 'success'},
]

type Model = {
  orderNumber: number
  createdAt: string
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
  readonly status: QuantityStatusEnum
} & AbstractModel & CreateTimestamp

export default Model;