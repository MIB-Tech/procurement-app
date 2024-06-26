import { AbstractModel } from "../../../_core/types/types";
import { PurchaseOrderModel } from "../PurchaseOrder";
import { ProductModel } from "../Product";
import { PurchaseOrderProductComponentModel } from "../PurchaseOrderProductComponent";
import { QuantityStatusEnum } from "../PurchaseOrder/Model";
import { ReceiptProductModel } from "../ReceiptProduct";

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
  receiptProducts: Array<ReceiptProductModel>;
  components: Array<PurchaseOrderProductComponentModel>;
  priceExclTax: number;
  priceInclTax: number;
  discountedUnitPrice?: number;
  readonly receiptStatus?: QuantityStatusEnum;
  readonly vatTax?: boolean;
  readonly receiptRestQuantity?: number;
  readonly editablePrice?: boolean;
} & AbstractModel;

export default Model;
