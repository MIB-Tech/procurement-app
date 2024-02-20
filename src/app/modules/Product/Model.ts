import {AbstractModel} from '../../../_custom/types/types';
import {PurchaseNeedProductModel} from '../PurchaseNeedProduct';
import {CategoryModel} from '../Category';
import {ProductPricingModel} from '../ProductPricing';
import {PurchaseOrderModel} from '../PurchaseOrder';
import {ComponentModel} from '../Component';
import {ProductSectionModel} from "../ProductSection";
import {StringSelectOption} from "../../../_custom/Column/String/StringColumn";
import {ClinicStatusEnum} from "../PurchaseOrder/Model";

export enum ProductTypeEnum {
  Simple = 'SIMPLE',
  Combined = 'COMBINED',
  SubComponent = 'SUB_COMPONENT'
}

export const PRODUCT_TYPES: Array<StringSelectOption> = [
  {id: ProductTypeEnum.Simple},
  {id: ProductTypeEnum.Combined},
  {id: ProductTypeEnum.SubComponent}

];
type Model = {
  designation: string
  code: string
  ref?: string
  note?: string
  measurementUnit: string
  accountingAccount: string
  vatRate: number
  mobilised: boolean
  stockable: boolean
  productType:ProductTypeEnum
  category: CategoryModel
  section?: ProductSectionModel
  components: Array<ComponentModel>
  parentComponents: Array<ComponentModel>
  purchaseNeedProducts: Array<PurchaseNeedProductModel>
  pricing: Array<ProductPricingModel>
  purchaseOrders: Array<PurchaseOrderModel>
} & AbstractModel

export default Model;