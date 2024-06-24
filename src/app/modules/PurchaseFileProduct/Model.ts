import { AbstractModel } from "../../../_core/types/types";
import { PurchaseFileModel } from "../PurchaseFile";
import { VendorOfferModel } from "../VendorOffer";

type Model = {
  code: string;
  designation: string;
  orderedQuantity: number;
  validateQuantity: number;
  partNumber: number;
  devisNumber: number;
  recommendedPrice: number;
  purchaseFile: PurchaseFileModel;
  vendorOffer: Array<VendorOfferModel>;
} & AbstractModel;

export default Model;
