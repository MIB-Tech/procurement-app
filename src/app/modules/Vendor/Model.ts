import {VendorAddressModel} from '../VendorAddress';
import {AbstractModel} from '../../../_custom/types/types';
import {ProductPricingModel} from '../ProductPricing';

type Model = {
  name: string
  code: string
  ice:string
  email:string
  phoneNumber:string
  secondaryPhoneNumber:string
  addresses: Array<VendorAddressModel>
  productPricing: Array<ProductPricingModel>
} & AbstractModel

export default Model;