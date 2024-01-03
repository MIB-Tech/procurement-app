import {AbstractModel, CreateTimestamp} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {VendorModel} from '../Vendor';
import {CurrencyModel} from '../Currency';
import {ProjectModel} from '../Project';
import {PurchaseOrderCategoryModel} from '../PurchaseOrderCategory';
import {PurchaseOrderAttachmentModel} from '../PurchaseOrderAttachment';
import {StringSelectOption} from '../../../_custom/Column/String/StringColumn';
import {paymentModalityModel} from '../PaymentModality';
import {VendorAddressModel} from '../VendorAddress';
import {ProductModel} from '../Product';

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
  paymentModality: paymentModalityModel
  readonly totalExclTax: number
  readonly totalVatTax: number
  readonly totalInclTax: number
  readonly status: QuantityStatusEnum
} & AbstractModel & CreateTimestamp

export type PurchaseOrderPrint = {
  taxType?: 'HT' | 'TTC'
  grossTotalExclTax: string
  totalInclTax: string
  totalVatTax: string
  //
  comment?: string
  groupement1?: string
  groupement2?: string
  vendor: Pick<VendorModel, 'name' | 'phoneNumber'> & Pick<VendorAddressModel, 'address' | 'postalCode'>
  currency: Pick<CurrencyModel, 'code'>
  purchaseOrderProducts: Array<{
    product: Pick<ProductModel, 'code'>
    vatRate?: string
    grossPrice?: string
    netPrice: string
    grossTotalExclTax: string
    discount: {value: number} & Pick<PurchaseOrderProductModel, 'discountType'>
  } & Pick<PurchaseOrderProductModel, 'designation' | 'quantity'>>
} & Pick<Model, 'orderNumber' | 'createdAt' | 'desiredDeliveryDate' | 'ref' | 'externalRef'>
export default Model;