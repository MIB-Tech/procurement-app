import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseNeedProductModel} from '../PurchaseNeedProduct';
import {CategoryModel} from '../Category';
import {ProductPricingModel} from "../ProductPricing";
import {PurchaseOrderModel} from "../PurchaseOrder";


type Model = {
  designation: string
  code: string
  reference: string
  note: string
  measurementUnit: string
  accountingAccount: string
  vatRate: number
  isMobilised: boolean
  stockable: boolean
  category: CategoryModel
  parent?: Model
  children: Array<Model>
  purchaseNeedProducts: Array<PurchaseNeedProductModel>
  productpricings: Array<ProductPricingModel>
  purchaseOrders: Array<PurchaseOrderModel>

} & AbstractModel

export default Model;