import { AbstractModel } from "../../../_custom/types/types";
import { DesiredProductModel } from "../DesiredProduct";
import { PurchaseOrderModel } from "../PurchaseOrder";
import { ProductModel } from "../Product";
import { PurchaseOrderProductComponentModel } from "../PurchaseOrderProductComponent";

export enum DiscountType {
  Percent = "PERCENT",
  Amount = "AMOUNT",
}

type Model = {
  designation: string;
  quantity: number;
  grossPrice: number;
  note: string;
  vatRate: number;
  discountType: DiscountType;
  discountValue: number;
  product: ProductModel;
  purchaseOrder: PurchaseOrderModel;
  desiredProducts: Array<DesiredProductModel>;
  components: Array<PurchaseOrderProductComponentModel>;
  priceExclTax: number;
  priceInclTax: number;
  discountedUnitPrice: number;
  readonly status: boolean;
  readonly vatTax: boolean;
  editablePrice?: boolean;
} & AbstractModel;

export default Model;
