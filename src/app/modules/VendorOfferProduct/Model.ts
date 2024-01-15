import {AbstractModel} from '../../../_custom/types/types';
import {VendorOfferModel} from '../VendorOffer';
import {PurchaseFileProductModel} from '../PurchaseFileProduct';

type Model = {
  description: string
  vendorProductCode: number
  desination: string
  quantity: number
  unitPrice: number
  vatRate: number
  // amountExclTax:number
  // amountInclTax:number
  isConform: boolean
  score: number
  vendorOffer: VendorOfferModel
  purchaseFileProduct: PurchaseFileProductModel
} & AbstractModel

export default Model;