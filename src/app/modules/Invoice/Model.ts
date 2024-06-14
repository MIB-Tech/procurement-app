import { AbstractModel, CreateTimestamp } from "../../../_core/types/types";
import { PurchaseOrderModel } from "../PurchaseOrder";
import { VendorModel } from "../Vendor";
import {
  PurchaseOrderComponentPrint,
  PurchaseOrderPrint,
  PurchaseOrderProductPrint,
} from "../PurchaseOrder/Model";
import { InvoiceAttachmentModel } from "../InvoiceAttachment";
import { PaymentTermModel } from "../PaymentTerm";

type Model = {
  invoiceNumber: string;
  ref?: string;
  externalRef?: string;
  posted?: boolean;
  accounted?: boolean;
  sageAccountingRef: string;
  purchaseOrders: Array<PurchaseOrderModel>;
  attachments: Array<InvoiceAttachmentModel>;
  paymentTerms: Array<PaymentTermModel>;
  readonly vendor: VendorModel;
  readonly totalExclTax?: number;
  totalInclTax?: number;
  readonly totalVatTax?: number;
  readonly totalDiscount?: number;
} & AbstractModel &
  CreateTimestamp;

export type InvoicePrint = {
  bill: string;
  lines: Array<
    | (Omit<PurchaseOrderProductPrint, "netPrice"> & {
        netPriceExclTax: string;
        netPriceInclTax: string;
      })
    | PurchaseOrderComponentPrint
  >;
} & Omit<PurchaseOrderPrint, "clinic" | "taxType" | "lines">;
export default Model;
