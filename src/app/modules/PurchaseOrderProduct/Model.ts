import {AbstractModel} from '../../../_custom/types/types';
import {DesiredProductModel} from '../DesiredProduct';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {ProductModel} from '../Product';

export enum DiscountType {
  Percent = 'PERCENT',
  Amount = 'AMOUNT',
}

type Model = {
  designation: string
  quantity: number
  grossPrice: number
  note: string
  vatRate: number
  discountType: DiscountType
  discountValue: number
  readonly netPrice: number
  readonly netPriceExclTax: number
  readonly priceInclTax: number
  readonly status: boolean
  readonly vatTax: boolean
  product: ProductModel
  purchaseOrder: PurchaseOrderModel
  desiredProducts: Array<DesiredProductModel>
} & AbstractModel

export default Model;