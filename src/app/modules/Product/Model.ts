import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseNeedProductModel} from '../PurchaseNeedProduct';
import {CategoryModel} from '../Category';
import {ProductPricingModel} from '../ProductPricing';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {ComponentModel} from '../Component';
import {ProductSectionModel} from "../ProductSection";
import {StringSelectOption} from "../../../_custom/Column/String/StringColumn";

export enum ProductTypeEnum {
  Simple = 'SIMPLE',
  Combined = 'COMBINED',
  SubComponent = 'SUB_COMPONENT'
}

export let PRODUCT_TYPES: Array<StringSelectOption> = [
  {id: ProductTypeEnum.Simple, color: 'primary'},
  {id: ProductTypeEnum.Combined, color: 'info'},
  {id: ProductTypeEnum.SubComponent, color: 'warning'}
];
type Model = {
  productType: ProductTypeEnum
  designation: string
  code: string
  ref?: string
  note?: string
  measurementUnit: string
  accountingAccount: string
  vatRate: number
  mobilised: boolean
  stockable: boolean
  category: CategoryModel
  section?: ProductSectionModel
  components: Array<ComponentModel>
  parentComponents: Array<ComponentModel>
  purchaseNeedProducts: Array<PurchaseNeedProductModel>
  pricing: Array<ProductPricingModel>
  purchaseOrders: Array<PurchaseOrderModel>
} & AbstractModel

export default Model;