import {VendorContactModel} from '../VendorAddress';
import {AbstractModel} from '../../../_custom/types/types';
import {ProductPricingModel} from '../ProductPricing';

type Model = {
  name: string
  code: string
  ice:string
  email:string
  phoneNumber:string
  secondaryPhoneNumber:string
  contacts: Array<VendorContactModel>
  productPricing: Array<ProductPricingModel>
} & AbstractModel

export default Model;