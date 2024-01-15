import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseFileTypeModel} from '../PurchaseFileType';
import {VendorModel} from '../Vendor';
import {ProductModel} from '../Product';


type Model = {
  applicatedAt: string
  bidPriceInclTax: string
  discountValue: PurchaseFileTypeModel
  purchasePriceInclTax: string
  purchasePriceExclTax: string
  vendor: VendorModel
  product: ProductModel
} & AbstractModel

export default Model;