import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseNeedProductModel} from '../PurchaseNeedProduct';
import {CategoryModel} from '../Category';
import {ProductPricingModel} from '../ProductPricing';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {ComponentModel} from '../Component';
import {ProductSectionModel} from "../ProductSection";


type Model = {
  designation: string
  code: string
  reference?: string
  note?: string
  measurementUnit: string
  accountingAccount: string
  vatRate: number
  isMobilised: boolean
  stockable: boolean
  category: CategoryModel
  components: Array<ComponentModel>
  parentComponents: Array<ComponentModel>
  purchaseNeedProducts: Array<PurchaseNeedProductModel>
  pricing: Array<ProductPricingModel>
  purchaseOrders: Array<PurchaseOrderModel>
  section: ProductSectionModel
} & AbstractModel

export default Model;