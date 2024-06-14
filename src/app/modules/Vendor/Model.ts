import { VendorAddressModel } from "../VendorAddress";
import { AbstractModel } from "../../../_core/types/types";
import { ProductPricingModel } from "../ProductPricing";
import { PaymentModalityModel } from "../PaymentModality";

type Model = {
  name: string;
  code: string;
  ice: string;
  email: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
  addresses: Array<VendorAddressModel>;
  productPricing: Array<ProductPricingModel>;
  paymentModality: PaymentModalityModel;
  readonly defaultAddress: VendorAddressModel;
} & AbstractModel;

export default Model;
