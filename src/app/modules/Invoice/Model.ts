import { AbstractModel, CreateTimestamp } from "../../../_custom/types/types";
import { PurchaseOrderModel } from "../PurchaseOrder";
import { VendorModel } from "../Vendor";
import {
  PurchaseOrderComponentPrint,
  PurchaseOrderPrint,
  PurchaseOrderProductPrint,
} from "../PurchaseOrder/Model";
import { InvoiceAttachmentModel } from "../InvoiceAttachment";

type Model = {
  invoiceNumber: string;
  ref?: string;
  externalRef?: string;
  posted: boolean;
  accounted: boolean;
  sageAccountingRef: string;
  purchaseOrders: Array<PurchaseOrderModel>;
  attachments: Array<InvoiceAttachmentModel>;
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
