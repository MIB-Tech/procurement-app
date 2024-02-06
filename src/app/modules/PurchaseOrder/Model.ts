import {AbstractModel, CreateTimestamp} from '../../../_custom/types/types';
import {PurchaseOrderProductModel} from '../PurchaseOrderProduct';
import {VendorModel} from '../Vendor';
import {CurrencyModel} from '../Currency';
import {PurchaseOrderCategoryModel} from '../PurchaseOrderCategory';
import {PurchaseOrderAttachmentModel} from '../PurchaseOrderAttachment';
import {StringSelectOption} from '../../../_custom/Column/String/StringColumn';
import {VendorAddressModel} from '../VendorAddress';
import {ProductModel} from '../Product';
import {PaymentModalityModel} from '../PaymentModality';
import {InvoiceModel} from "../Invoice";
import {UserModel} from '../User';

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

export enum ValidationStatusEnum {
  Validated = 'VALIDATED',
  Pending = 'PENDING'
}

export const VALIDATION_STATUS_OPTIONS: Array<StringSelectOption> = [
  {id: ValidationStatusEnum.Pending, color: 'warning'},
  {id: ValidationStatusEnum.Validated, color: 'success'},
];

type Model = {
  orderNumber: string
  taxIncluded: boolean
  ref?: string
  externalRef?: string
  desiredDeliveryDate: string
  validationStatus: ValidationStatusEnum
  validatedBy?: UserModel
  validatedAt?: string
  vendor: VendorModel
  currency?: CurrencyModel
  category: PurchaseOrderCategoryModel
  purchaseOrderProducts: Array<PurchaseOrderProductModel>
  attachments: Array<PurchaseOrderAttachmentModel>
  paymentModality: PaymentModalityModel
  invoice: InvoiceModel
  readonly totalExclTax: number
  readonly totalVatTax: number
  readonly totalDiscount: number
  readonly totalInclTax: number
  readonly status: QuantityStatusEnum
} & AbstractModel & CreateTimestamp

export enum LineType {
  Product = 'PRODUCT',
  Component = 'COMPONENT',
}

export type PurchaseOrderProductPrint = {
  type: LineType.Product
  product: Pick<ProductModel, 'code'>
  grossPrice?: string
  netPriceExclTax: string
  discount: string
} & Pick<PurchaseOrderProductModel, 'designation' | 'quantity'>
export type PurchaseOrderComponentPrint = {
  type: LineType.Component
} & Pick<PurchaseOrderProductPrint, 'product' | 'designation' | 'quantity'>
export type PurchaseOrderLinePrint = PurchaseOrderProductPrint | PurchaseOrderComponentPrint

export type PurchaseOrderPrint = {
  totalExclTax: string
  totalInclTax: string
  totalVatTax: string
  totalDiscount: string
  address?: string
  paymentModality: Pick<PaymentModalityModel, 'name'>
  vendor: {
    defaultAddress: Pick<VendorAddressModel, 'address' | 'postalCode'>
  } & Pick<VendorModel, 'name' | 'phoneNumber' | 'ice'>
  //
  lines: Array<PurchaseOrderLinePrint>
  // FIXME
  comment?: string
} & Pick<Model, 'orderNumber' | 'createdAt' | 'ref'>


export default Model;