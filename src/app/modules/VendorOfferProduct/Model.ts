import { AbstractModel } from "../../../_core/types/types";
import { VendorOfferModel } from "../VendorOffer";
import { PurchaseFileProductModel } from "../PurchaseFileProduct";

type Model = {
  description: string;
  vendorProductCode: number;
  designation: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  // amountExclTax:number
  // amountInclTax:number
  isConform: boolean;
  score: number;
  vendorOffer: VendorOfferModel;
  purchaseFileProduct: PurchaseFileProductModel;
} & AbstractModel;

export default Model;
