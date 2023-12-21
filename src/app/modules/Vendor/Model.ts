import {VendorContactModel} from '../VendorContact';
import {AbstractModel} from '../../../_custom/types/types';
import {ProductPricingModel} from "../ProductPricing";

type Model = {
  name: string
  code: string
  contacts: Array<VendorContactModel>
  ProductPricing:Array<ProductPricingModel>
} & AbstractModel

export default Model;