import {AbstractModel, CreateTimestamp} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {VendorModel} from '../Vendor';
import {CurrencyModel} from '../Currency';
import {ProjectModel} from '../Project';
import {PurchaseOrderCategoryModel} from '../PurchaseOrderCategory';
import {PurchaseOrderAttachmentModel} from '../PurchaseOrderAttachment';
import {StringSelectOption} from '../../../_custom/Column/String/StringColumn';
import {VendorAddressModel} from '../VendorAddress';
import {ProductModel} from '../Product';
import {PaymentModalityModel} from '../PaymentModality';
import {InvoiceModel} from "../Invoice";

export enum QuantityStatusEnum {
  Unreceived = 'UNRECEIVED',
  PartiallyReceived = 'PARTIALLY_RECEIVED',
  FullyReceived = 'FULLY_RECEIVED',
}

export const QUANTITY_STATUS_OPTIONS: Array<StringSelectOption> = [
  {id: QuantityStatusEnum.Unreceived, color: 'warning'},
  {id: QuantityStatusEnum.PartiallyReceived, color: 'primary'},
  {id: QuantityStatusEnum.FullyReceived, color: 'success'},
];

type Model = {
  orderNumber: string
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
  paymentModality: PaymentModalityModel
  invoice: InvoiceModel
  readonly totalExclTax: number
  readonly totalVatTax: number
  readonly totalDiscount: number
  readonly totalInclTax: number
  readonly status: QuantityStatusEnum
} & AbstractModel & CreateTimestamp

export type PurchaseOrderPrint = {
  totalExclTax: string
  totalInclTax: string
  totalVatTax: string
  totalDiscount: string
  address?: string
  paymentModality: Pick<PaymentModalityModel, 'name'>
  vendor: {
    defaultAddress: Pick<VendorAddressModel, 'address' | 'postalCode'>
  } & Pick<VendorModel, 'name' | 'phoneNumber'>
  //
  purchaseOrderProducts: Array<{
    product: Pick<ProductModel, 'code'>
    grossPrice?: string
    netPriceExclTax: string
    discount: string
  } & Pick<PurchaseOrderProductModel, 'designation' | 'quantity'>>
  // FIXME
  comment?: string
  groupement1?: string
  groupement2?: string
} & Pick<Model, 'orderNumber' | 'createdAt' | 'desiredDeliveryDate' | 'ref'>


export default Model;