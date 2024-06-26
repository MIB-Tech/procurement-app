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
import { AccountingModel } from "../../Accounting";

type Model = {
  invoiceNumber: string;
  ref?: string;
  externalRef?: string;
  accounted?: boolean;
  sageAccountingRef: string;
  totalExclTax?: number;
  totalInclTax?: number;
  totalVatTax?: number;
  totalDiscount?: number;
  /** @deprecated */
  purchaseOrders: Array<PurchaseOrderModel>;
  attachments: Array<InvoiceAttachmentModel>;
  paymentTerms: Array<PaymentTermModel>;
  accountings: Array<AccountingModel>;
  readonly vendor: VendorModel;
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
